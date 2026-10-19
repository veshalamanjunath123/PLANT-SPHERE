import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import Pagination from '../components/Pagination';

/* ─── constants ──────────────────────────────────────────────── */
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80';

const SORT_OPTIONS = [
  { value: 'newest',     label: 'Featured',           sortBy: 'createdAt', dir: 'DESC' },
  { value: 'name-asc',  label: 'Alphabetically, A–Z', sortBy: 'name',      dir: 'ASC'  },
  { value: 'name-desc', label: 'Alphabetically, Z–A', sortBy: 'name',      dir: 'DESC' },
  { value: 'price-asc', label: 'Price: Low to High',  sortBy: 'price',     dir: 'ASC'  },
  { value: 'price-desc',label: 'Price: High to Low',  sortBy: 'price',     dir: 'DESC' },
];

// Filters backed by real Product entity fields
const SUNLIGHT_OPTIONS   = ['Low Light', 'Indirect Light', 'Bright Indirect Light', 'Direct Sunlight', 'Full Shade'];
const WATERING_OPTIONS   = ['Daily', 'Twice a Week', 'Once a Week', 'Every 10 Days', 'Every 2 Weeks', 'Monthly'];
const DIFFICULTY_OPTIONS = ['Easy', 'Moderate', 'Expert'];
const LOCATION_OPTIONS   = ['Indoor', 'Outdoor', 'Balcony', 'Terrace', 'Living Room', 'Office'];

/* ─── tiny product card ──────────────────────────────────────── */
function CollectionCard({ product }) {
  const isOutOfStock = product.stockQuantity <= 0;

  return (
    <div className="coll-card">
      {/* Image */}
      <Link to={`/products/${product.id}`} className="coll-card__img-wrap">
        <img
          src={product.imageUrl || FALLBACK_IMAGE}
          alt={product.name}
          loading="lazy"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMAGE; }}
        />
        {isOutOfStock && <span className="coll-card__oos-badge">Sold Out</span>}
      </Link>

      {/* Details */}
      <div className="coll-card__body">
        <span className="coll-card__cat">{product.categoryName}</span>
        <Link to={`/products/${product.id}`} className="coll-card__name" title={product.name}>
          {product.name}
        </Link>

        {/* Meta tags */}
        <div className="coll-card__meta">
          {product.sunlightRequirement && (
            <span className="coll-card__tag">
              <i className="bi bi-brightness-high-fill"></i> {product.sunlightRequirement}
            </span>
          )}
          {product.difficultyLevel && (
            <span className="coll-card__tag">
              <i className="bi bi-bar-chart-fill"></i> {product.difficultyLevel}
            </span>
          )}
        </div>

        {/* Price + Actions */}
        <div className="coll-card__footer">
          <span className="coll-card__price">₹{Number(product.price).toFixed(2)}</span>
          <div className="coll-card__actions">
            <Link to={`/products/${product.id}`} className="coll-btn-outline" title="View Details">
              View
            </Link>
            <button
              type="button"
              className="coll-btn-fill"
              disabled={isOutOfStock}
              onClick={() => alert(`Added "${product.name}" to bag.`)}
              title={isOutOfStock ? 'Sold Out' : 'Add to Bag'}
            >
              <i className="bi bi-bag-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── expandable filter group ────────────────────────────────── */
function FilterGroup({ title, options, selected, onChange, onClear }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="filter-group">
      <button className="filter-group__header" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <i className={`bi bi-chevron-${open ? 'up' : 'down'}`}></i>
      </button>
      {open && (
        <div className="filter-group__body">
          {options.map((opt) => (
            <label key={opt} className="filter-check">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onChange(opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
          {selected.length > 0 && (
            <button className="filter-clear-link" onClick={onClear}>Clear</button>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── price range filter ─────────────────────────────────────── */
function PriceFilter({ minPrice, maxPrice, onApply, onClear }) {
  const [open, setOpen] = useState(true);
  const [min, setMin] = useState(minPrice || '');
  const [max, setMax] = useState(maxPrice || '');

  // sync if URL changes externally
  useEffect(() => { setMin(minPrice || ''); }, [minPrice]);
  useEffect(() => { setMax(maxPrice || ''); }, [maxPrice]);

  return (
    <div className="filter-group">
      <button className="filter-group__header" onClick={() => setOpen(!open)}>
        <span>Price Range</span>
        <i className={`bi bi-chevron-${open ? 'up' : 'down'}`}></i>
      </button>
      {open && (
        <div className="filter-group__body">
          <div className="price-range-row">
            <input
              type="number"
              min="0"
              placeholder="Min ₹"
              className="price-input"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
            <span className="price-sep">–</span>
            <input
              type="number"
              min="0"
              placeholder="Max ₹"
              className="price-input"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <div className="d-flex gap-2 mt-2">
            <button className="coll-btn-fill w-100" onClick={() => onApply(min, max)}>Apply</button>
            {(minPrice || maxPrice) && (
              <button className="coll-btn-outline" onClick={() => { setMin(''); setMax(''); onClear(); }}>✕</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── main ShopPage ──────────────────────────────────────────── */
export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── URL state ──────────────────────────────────────────────────
  const selectedCategory = searchParams.get('category') || '';
  const searchQuery      = searchParams.get('search')   || '';
  const currentPage      = parseInt(searchParams.get('page') || '0', 10);
  const sortOption       = searchParams.get('sort')     || 'newest';
  const minPriceParam    = searchParams.get('minPrice') || '';
  const maxPriceParam    = searchParams.get('maxPrice') || '';
  const sunlightParam    = searchParams.getAll('sunlight');
  const wateringParam    = searchParams.getAll('watering');
  const difficultyParam  = searchParams.getAll('difficulty');
  const locationParam    = searchParams.getAll('location');
  const inStockParam     = searchParams.get('inStock') === 'true';

  // ── local UI state ────────────────────────────────────────────
  const [categories,     setCategories]     = useState([]);
  const [products,       setProducts]       = useState([]);
  const [totalPages,     setTotalPages]     = useState(0);
  const [totalElements,  setTotalElements]  = useState(0);
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState(null);
  const [drawerOpen,     setDrawerOpen]     = useState(false);

  // ── category shortcuts ─────────────────────────────────────────
  const SHORTCUTS = [
    { label: 'All Plants', id: '' },
    { label: 'Indoor',     id: 'indoor'  },
    { label: 'Outdoor',    id: 'outdoor' },
    { label: 'Succulents', id: 'succulent' },
    { label: 'Flowering',  id: 'flowering' },
    { label: 'Air Plants', id: 'air' },
  ];

  // Load categories once
  useEffect(() => {
    axiosClient.get('/categories')
      .then((r) => setCategories(r.data || []))
      .catch(() => {});
  }, []);

  // ── fetch products whenever URL params change ──────────────────
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const sortObj = SORT_OPTIONS.find((s) => s.value === sortOption) || SORT_OPTIONS[0];
      const params = {
        page: currentPage,
        size: 12,
        sortBy: sortObj.sortBy,
        direction: sortObj.dir,
      };
      if (selectedCategory) params.categoryId = selectedCategory;
      if (searchQuery.trim()) params.search    = searchQuery.trim();
      if (minPriceParam)      params.minPrice  = minPriceParam;
      if (maxPriceParam)      params.maxPrice  = maxPriceParam;

      const res = await axiosClient.get('/products', { params });
      let content = res.data.content || [];

      // Client-side secondary filters (fields not in backend query)
      if (sunlightParam.length)   content = content.filter((p) => sunlightParam.includes(p.sunlightRequirement));
      if (wateringParam.length)   content = content.filter((p) => wateringParam.includes(p.wateringFrequency));
      if (difficultyParam.length) content = content.filter((p) => difficultyParam.includes(p.difficultyLevel));
      if (locationParam.length)   content = content.filter((p) => locationParam.some((l) => p.suitableLocation?.includes(l)));
      if (inStockParam)           content = content.filter((p) => p.stockQuantity > 0);

      setProducts(content);
      setTotalPages(res.data.totalPages || 0);
      setTotalElements(res.data.totalElements || 0);
    } catch (err) {
      console.error(err);
      setError('Unable to fetch plants. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // ── param helpers ─────────────────────────────────────────────
  const setParam = (key, value) => {
    const np = new URLSearchParams(searchParams);
    if (value) np.set(key, value); else np.delete(key);
    np.set('page', '0');
    setSearchParams(np);
  };

  const toggleMultiParam = (key, value) => {
    const np = new URLSearchParams(searchParams);
    const existing = np.getAll(key);
    np.delete(key);
    const next = existing.includes(value)
      ? existing.filter((v) => v !== value)
      : [...existing, value];
    next.forEach((v) => np.append(key, v));
    np.set('page', '0');
    setSearchParams(np);
  };

  const clearMultiParam = (key) => {
    const np = new URLSearchParams(searchParams);
    np.delete(key);
    np.set('page', '0');
    setSearchParams(np);
  };

  const clearAll = () => setSearchParams(new URLSearchParams());

  // ── active chips ──────────────────────────────────────────────
  const activeChips = [];
  if (searchQuery) activeChips.push({ label: `"${searchQuery}"`, clear: () => setParam('search', '') });
  if (selectedCategory) {
    const cat = categories.find((c) => c.id.toString() === selectedCategory);
    if (cat) activeChips.push({ label: cat.name, clear: () => setParam('category', '') });
  }
  if (minPriceParam || maxPriceParam) {
    activeChips.push({
      label: `₹${minPriceParam || 0} – ₹${maxPriceParam || '∞'}`,
      clear: () => {
        const np = new URLSearchParams(searchParams);
        np.delete('minPrice'); np.delete('maxPrice'); np.set('page', '0');
        setSearchParams(np);
      },
    });
  }
  sunlightParam.forEach((v)   => activeChips.push({ label: `☀ ${v}`,  clear: () => toggleMultiParam('sunlight', v) }));
  wateringParam.forEach((v)   => activeChips.push({ label: `💧 ${v}`, clear: () => toggleMultiParam('watering', v) }));
  difficultyParam.forEach((v) => activeChips.push({ label: `📊 ${v}`, clear: () => toggleMultiParam('difficulty', v) }));
  locationParam.forEach((v)   => activeChips.push({ label: `📍 ${v}`, clear: () => toggleMultiParam('location', v) }));
  if (inStockParam) activeChips.push({ label: 'In Stock', clear: () => setParam('inStock', '') });

  // ── filter sidebar markup (shared for desktop + drawer) ───────
  const filterSidebar = (
    <div className="filter-sidebar-content">
      <div className="filter-sidebar-head">
        <span className="filter-sidebar-title">Filters</span>
        {activeChips.length > 0 && (
          <button className="filter-clear-link" onClick={clearAll}>Clear All</button>
        )}
      </div>

      {/* In Stock */}
      <div className="filter-group">
        <label className="filter-check">
          <input
            type="checkbox"
            checked={inStockParam}
            onChange={() => setParam('inStock', inStockParam ? '' : 'true')}
          />
          <span>In Stock Only</span>
        </label>
      </div>

      {/* Categories */}
      <div className="filter-group">
        <button className="filter-group__header" onClick={() => {}}>
          <span>Category</span>
        </button>
        <div className="filter-group__body">
          <label className="filter-check">
            <input type="radio" name="cat" checked={!selectedCategory}
              onChange={() => setParam('category', '')} />
            <span>All</span>
          </label>
          {categories.map((c) => (
            <label key={c.id} className="filter-check">
              <input type="radio" name="cat" checked={selectedCategory === c.id.toString()}
                onChange={() => setParam('category', c.id.toString())} />
              <span>{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <PriceFilter
        minPrice={minPriceParam}
        maxPrice={maxPriceParam}
        onApply={(min, max) => {
          const np = new URLSearchParams(searchParams);
          if (min) np.set('minPrice', min); else np.delete('minPrice');
          if (max) np.set('maxPrice', max); else np.delete('maxPrice');
          np.set('page', '0');
          setSearchParams(np);
        }}
        onClear={() => {
          const np = new URLSearchParams(searchParams);
          np.delete('minPrice'); np.delete('maxPrice'); np.set('page', '0');
          setSearchParams(np);
        }}
      />

      {/* Sunlight */}
      <FilterGroup
        title="Light Requirement"
        options={SUNLIGHT_OPTIONS}
        selected={sunlightParam}
        onChange={(v) => toggleMultiParam('sunlight', v)}
        onClear={() => clearMultiParam('sunlight')}
      />

      {/* Watering */}
      <FilterGroup
        title="Watering Schedule"
        options={WATERING_OPTIONS}
        selected={wateringParam}
        onChange={(v) => toggleMultiParam('watering', v)}
        onClear={() => clearMultiParam('watering')}
      />

      {/* Difficulty */}
      <FilterGroup
        title="Maintenance Level"
        options={DIFFICULTY_OPTIONS}
        selected={difficultyParam}
        onChange={(v) => toggleMultiParam('difficulty', v)}
        onClear={() => clearMultiParam('difficulty')}
      />

      {/* Location */}
      <FilterGroup
        title="Suitable Location"
        options={LOCATION_OPTIONS}
        selected={locationParam}
        onChange={(v) => toggleMultiParam('location', v)}
        onClear={() => clearMultiParam('location')}
      />
    </div>
  );

  return (
    <>
      {/* ── Mobile filter drawer overlay ──────────────────────── */}
      {drawerOpen && (
        <div className="filter-drawer-overlay" onClick={() => setDrawerOpen(false)}>
          <aside className="filter-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="filter-drawer-close">
              <button onClick={() => setDrawerOpen(false)}><i className="bi bi-x-lg"></i></button>
            </div>
            {filterSidebar}
          </aside>
        </div>
      )}

      <div className="coll-page">
        {/* ── Breadcrumb ─────────────────────────────────────── */}
        <div className="container">
          <nav className="coll-breadcrumb" aria-label="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Plants</span>
            {categories.find((c) => c.id.toString() === selectedCategory) && (
              <>
                <span>/</span>
                <span>{categories.find((c) => c.id.toString() === selectedCategory)?.name}</span>
              </>
            )}
          </nav>

          {/* ── Category shortcut bar ──────────────────────── */}
          <div className="coll-shortcuts" role="navigation" aria-label="Category shortcuts">
            {categories.slice(0, 8).map((cat) => (
              <button
                key={cat.id}
                className={`coll-shortcut-btn${selectedCategory === cat.id.toString() ? ' active' : ''}`}
                onClick={() => setParam('category', cat.id.toString())}
              >
                {cat.name}
              </button>
            ))}
            <button
              className={`coll-shortcut-btn${!selectedCategory ? ' active' : ''}`}
              onClick={() => setParam('category', '')}
            >
              All Plants
            </button>
          </div>

          {/* ── Page heading ───────────────────────────────── */}
          <div className="coll-heading">
            <div>
              <h1 className="coll-title">
                {categories.find((c) => c.id.toString() === selectedCategory)?.name || 'Plants Collection'}
              </h1>
              <p className="coll-desc">
                Indoor, outdoor, succulents and seasonal blooms — find the right plant for every corner of your life.
              </p>
            </div>
          </div>

          {/* ── Toolbar: sort, filter btn, result count ────── */}
          <div className="coll-toolbar">
            <div className="d-flex align-items-center gap-2">
              {/* Mobile filter button */}
              <button
                className="coll-toolbar-filter-btn d-lg-none"
                onClick={() => setDrawerOpen(true)}
              >
                <i className="bi bi-sliders"></i> Filter
                {activeChips.length > 0 && <span className="filter-count-badge">{activeChips.length}</span>}
              </button>

              {/* Search */}
              <form
                className="coll-search-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setParam('search', e.target.q.value.trim());
                }}
              >
                <i className="bi bi-search coll-search-icon"></i>
                <input
                  name="q"
                  type="text"
                  defaultValue={searchQuery}
                  placeholder="Search plants…"
                  className="coll-search-input"
                  key={searchQuery}
                />
              </form>
            </div>

            <div className="d-flex align-items-center gap-3">
              {!loading && (
                <span className="coll-count">{totalElements} product{totalElements !== 1 ? 's' : ''}</span>
              )}
              <select
                className="coll-sort-select"
                value={sortOption}
                onChange={(e) => setParam('sort', e.target.value)}
              >
                {SORT_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ── Active filter chips ─────────────────────────── */}
          {activeChips.length > 0 && (
            <div className="coll-chips">
              {activeChips.map((chip, i) => (
                <button key={i} className="coll-chip" onClick={chip.clear}>
                  {chip.label} <i className="bi bi-x"></i>
                </button>
              ))}
              <button className="coll-chip coll-chip--clear" onClick={clearAll}>
                Clear All
              </button>
            </div>
          )}

          {/* ── Main layout: sidebar + grid ────────────────── */}
          <div className="coll-layout">
            {/* Desktop sidebar */}
            <aside className="coll-sidebar d-none d-lg-block">
              {filterSidebar}
            </aside>

            {/* Product area */}
            <section className="coll-main">
              {loading && <LoadingIndicator message="Loading plants…" />}
              {error   && <ErrorMessage message={error} onRetry={fetchProducts} />}

              {!loading && !error && products.length === 0 && (
                <div className="coll-empty">
                  <i className="bi bi-search coll-empty__icon"></i>
                  <h3>No plants found</h3>
                  <p>Try adjusting your filters or search term.</p>
                  <button className="coll-btn-fill" onClick={clearAll}>Clear Filters</button>
                </div>
              )}

              {!loading && !error && products.length > 0 && (
                <>
                  <div className="coll-grid">
                    {products.map((p) => (
                      <CollectionCard key={p.id} product={p} />
                    ))}
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(pg) => {
                      const np = new URLSearchParams(searchParams);
                      np.set('page', pg.toString());
                      setSearchParams(np);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}