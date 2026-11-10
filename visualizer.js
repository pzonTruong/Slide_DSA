/* =====================================================================
   INTERACTIVE MST ALGORITHM VISUALIZER & CODE RUNNER (CODEPEET STYLE)
   - Real-time 2.5D Isometric Dark Grid Platform & macOS Code Runner
   - Synchronized State Machine: Active Line, Variables Watch & MST Trail
   - Full Multi-Algorithm Suite: Kruskal (DSU), Prim (Heap), Borůvka (Parallel)
   ===================================================================== */

const ALGO_CONFIGS = {
  kruskal: {
    id: 'kruskal',
    name: 'Kruskal\'s Algorithm (MST + DSU)',
    category: '08 / Interactive Visualizer',
    description: 'Xây dựng Cây bao trùm nhỏ nhất bằng cách quét toàn bộ cạnh tăng dần, kết hợp Disjoint Set Union (DSU) nén đường đi để loại bỏ chu trình.',
    timeComp: 'O(E log E)',
    spaceComp: 'O(V)',
    filename: 'kruskal_mst.py - Python',
    codeLines: [
      { num: 1, html: `<span class="tok-kw">def</span> <span class="tok-fn">kruskal_mst</span>(<span class="tok-var">edges</span>, <span class="tok-var">num_nodes</span>):` },
      { num: 2, html: `    <span class="tok-var">edges</span>.<span class="tok-fn">sort</span>(<span class="tok-var">key</span><span class="tok-op">=</span><span class="tok-kw">lambda</span> <span class="tok-var">e</span>: <span class="tok-var">e.weight</span>)` },
      { num: 3, html: `    <span class="tok-var">dsu</span> <span class="tok-op">=</span> <span class="tok-fn">DSU</span>(<span class="tok-var">num_nodes</span>)` },
      { num: 4, html: `    <span class="tok-var">mst_edges</span> <span class="tok-op">=</span> []` },
      { num: 5, html: `    <span class="tok-var">total_cost</span> <span class="tok-op">=</span> <span class="tok-num">0.0</span>` },
      { num: 6, html: `    ` },
      { num: 7, html: `    <span class="tok-kw">for</span> <span class="tok-var">edge</span> <span class="tok-kw">in</span> <span class="tok-var">edges</span>:` },
      { num: 8, html: `        <span class="tok-var">u</span>, <span class="tok-var">v</span>, <span class="tok-var">w</span> <span class="tok-op">=</span> <span class="tok-var">edge.u</span>, <span class="tok-var">edge.v</span>, <span class="tok-var">edge.weight</span>` },
      { num: 9, html: `        <span class="tok-kw">if</span> <span class="tok-var">dsu</span>.<span class="tok-fn">find</span>(<span class="tok-var">u</span>) <span class="tok-op">!=</span> <span class="tok-var">dsu</span>.<span class="tok-fn">find</span>(<span class="tok-var">v</span>):` },
      { num: 10, html: `            <span class="tok-var">dsu</span>.<span class="tok-fn">union</span>(<span class="tok-var">u</span>, <span class="tok-var">v</span>)` },
      { num: 11, html: `            <span class="tok-var">mst_edges</span>.<span class="tok-fn">append</span>(<span class="tok-var">edge</span>)` },
      { num: 12, html: `            <span class="tok-var">total_cost</span> <span class="tok-op">+=</span> <span class="tok-var">w</span>` },
      { num: 13, html: `            <span class="tok-kw">if</span> <span class="tok-fn">len</span>(<span class="tok-var">mst_edges</span>) <span class="tok-op">==</span> <span class="tok-var">num_nodes</span> <span class="tok-op">-</span> <span class="tok-num">1</span>:` },
      { num: 14, html: `                <span class="tok-kw">break</span>  <span class="tok-comment"># Dừng sớm khi đủ V - 1 cạnh</span>` },
      { num: 15, html: `    <span class="tok-kw">return</span> <span class="tok-var">mst_edges</span>, <span class="tok-var">total_cost</span>` }
    ]
  },
  prim: {
    id: 'prim',
    name: 'Prim\'s Algorithm (Min-Heap + Cut Property)',
    category: '08 / Interactive Visualizer',
    description: 'Nuôi lớn một cây liên thông duy nhất từ 1 trạm gốc, liên tục kết nạp cạnh có chi phí nhỏ nhất băng qua lát cắt (Cut Property) bằng Min-Heap.',
    timeComp: 'O(E log V)',
    spaceComp: 'O(V)',
    filename: 'prim_mst.py - Python',
    codeLines: [
      { num: 1, html: `<span class="tok-kw">def</span> <span class="tok-fn">prim_mst</span>(<span class="tok-var">adj</span>, <span class="tok-var">start_node</span>, <span class="tok-var">num_nodes</span>):` },
      { num: 2, html: `    <span class="tok-var">visited</span> <span class="tok-op">=</span> {<span class="tok-var">start_node</span>}` },
      { num: 3, html: `    <span class="tok-var">pq</span> <span class="tok-op">=</span> [(<span class="tok-var">w</span>, <span class="tok-var">start_node</span>, <span class="tok-var">v</span>) <span class="tok-kw">for</span> <span class="tok-var">v</span>, <span class="tok-var">w</span> <span class="tok-kw">in</span> <span class="tok-var">adj</span>[<span class="tok-var">start_node</span>]]` },
      { num: 4, html: `    <span class="tok-fn">heapify</span>(<span class="tok-var">pq</span>)` },
      { num: 5, html: `    <span class="tok-var">mst_edges</span> <span class="tok-op">=</span> []` },
      { num: 6, html: `    <span class="tok-var">total_cost</span> <span class="tok-op">=</span> <span class="tok-num">0.0</span>` },
      { num: 7, html: `    ` },
      { num: 8, html: `    <span class="tok-kw">while</span> <span class="tok-var">pq</span> <span class="tok-kw">and</span> <span class="tok-fn">len</span>(<span class="tok-var">visited</span>) <span class="tok-op">&lt;</span> <span class="tok-var">num_nodes</span>:` },
      { num: 9, html: `        <span class="tok-var">w</span>, <span class="tok-var">u</span>, <span class="tok-var">v</span> <span class="tok-op">=</span> <span class="tok-fn">heappop</span>(<span class="tok-var">pq</span>)  <span class="tok-comment"># Lấy cạnh nhẹ nhất qua lát cắt</span>` },
      { num: 10, html: `        <span class="tok-kw">if</span> <span class="tok-var">v</span> <span class="tok-kw">not in</span> <span class="tok-var">visited</span>:` },
      { num: 11, html: `            <span class="tok-var">visited</span>.<span class="tok-fn">add</span>(<span class="tok-var">v</span>)` },
      { num: 12, html: `            <span class="tok-var">mst_edges</span>.<span class="tok-fn">append</span>((<span class="tok-var">u</span>, <span class="tok-var">v</span>, <span class="tok-var">w</span>))` },
      { num: 13, html: `            <span class="tok-var">total_cost</span> <span class="tok-op">+=</span> <span class="tok-var">w</span>` },
      { num: 14, html: `            <span class="tok-kw">for</span> <span class="tok-var">nxt</span>, <span class="tok-var">nw</span> <span class="tok-kw">in</span> <span class="tok-var">adj</span>[<span class="tok-var">v</span>]:` },
      { num: 15, html: `                <span class="tok-kw">if</span> <span class="tok-var">nxt</span> <span class="tok-kw">not in</span> <span class="tok-var">visited</span>:` },
      { num: 16, html: `                    <span class="tok-fn">heappush</span>(<span class="tok-var">pq</span>, (<span class="tok-var">nw</span>, <span class="tok-var">v</span>, <span class="tok-var">nxt</span>))` },
      { num: 17, html: `    <span class="tok-kw">return</span> <span class="tok-var">mst_edges</span>, <span class="tok-var">total_cost</span>` }
    ]
  },
  boruvka: {
    id: 'boruvka',
    name: 'Borůvka\'s Algorithm (Parallel Reduction)',
    category: '08 / Interactive Visualizer',
    description: 'Thuật toán MST song song đầu tiên trong lịch sử (1926): Trong mỗi vòng lặp, mọi cụm đồng thời tìm cạnh rẻ nhất nối ra ngoài và gộp lại.',
    timeComp: 'O(E log V)',
    spaceComp: 'O(V + E)',
    filename: 'boruvka_mst.py - Python',
    codeLines: [
      { num: 1, html: `<span class="tok-kw">def</span> <span class="tok-fn">boruvka_mst</span>(<span class="tok-var">edges</span>, <span class="tok-var">num_nodes</span>):` },
      { num: 2, html: `    <span class="tok-var">dsu</span> <span class="tok-op">=</span> <span class="tok-fn">DSU</span>(<span class="tok-var">num_nodes</span>)` },
      { num: 3, html: `    <span class="tok-var">mst_edges</span> <span class="tok-op">=</span> []` },
      { num: 4, html: `    <span class="tok-var">num_components</span> <span class="tok-op">=</span> <span class="tok-var">num_nodes</span>` },
      { num: 5, html: `    ` },
      { num: 6, html: `    <span class="tok-kw">while</span> <span class="tok-var">num_components</span> <span class="tok-op">&gt;</span> <span class="tok-num">1</span>:` },
      { num: 7, html: `        <span class="tok-var">cheapest</span> <span class="tok-op">=</span> {}  <span class="tok-comment"># {comp_root: min_edge}</span>` },
      { num: 8, html: `        <span class="tok-kw">for</span> <span class="tok-var">edge</span> <span class="tok-kw">in</span> <span class="tok-var">edges</span>:` },
      { num: 9, html: `            <span class="tok-var">ru</span>, <span class="tok-var">rv</span> <span class="tok-op">=</span> <span class="tok-var">dsu</span>.<span class="tok-fn">find</span>(<span class="tok-var">edge.u</span>), <span class="tok-var">dsu</span>.<span class="tok-fn">find</span>(<span class="tok-var">edge.v</span>)` },
      { num: 10, html: `            <span class="tok-kw">if</span> <span class="tok-var">ru</span> <span class="tok-op">!=</span> <span class="tok-var">rv</span>:` },
      { num: 11, html: `                <span class="tok-fn">update_cheapest</span>(<span class="tok-var">cheapest</span>, <span class="tok-var">ru</span>, <span class="tok-var">rv</span>, <span class="tok-var">edge</span>)` },
      { num: 12, html: `        <span class="tok-kw">for</span> <span class="tok-var">comp</span>, <span class="tok-var">edge</span> <span class="tok-kw">in</span> <span class="tok-var">cheapest</span>.<span class="tok-fn">items</span>():` },
      { num: 13, html: `            <span class="tok-kw">if</span> <span class="tok-var">dsu</span>.<span class="tok-fn">union</span>(<span class="tok-var">edge.u</span>, <span class="tok-var">edge.v</span>):` },
      { num: 14, html: `                <span class="tok-var">mst_edges</span>.<span class="tok-fn">append</span>(<span class="tok-var">edge</span>)` },
      { num: 15, html: `                <span class="tok-var">num_components</span> <span class="tok-op">-=</span> <span class="tok-num">1</span>` },
      { num: 16, html: `    <span class="tok-kw">return</span> <span class="tok-var">mst_edges</span>` }
    ]
  }
};

// Global Visualizer State Machine
const vizState = {
  currentAlgo: 'kruskal', // Default featured algorithm
  viewMode: 'iso',        // 'iso' | '2d'
  layoutMode: 'split',    // 'split' | 'stacked'
  theaterMode: false,
  stepIndex: 0,
  steps: [],
  isPlaying: false,
  autoInterval: null,
  speedMs: 700
};

// Realistic Hanoi Logistics Network on 2.5D Isometric Grid Platform
const NETWORK_NODES = [
  { id: 'H01', name: 'Long Biên Hub', u: 4.0, v: 1.5, type: 'hub', desc: 'Central Mega Hub' },
  { id: 'D02', name: 'Hoàn Kiếm Post', u: 6.5, v: 2.2, type: 'delivery', desc: 'Bưu cục phát' },
  { id: 'W02', name: 'Đống Đa DC', u: 5.5, v: 5.5, type: 'warehouse', desc: 'Kho trung chuyển' },
  { id: 'W01', name: 'Cầu Giấy DC', u: 1.5, v: 2.0, type: 'warehouse', desc: 'Kho trung chuyển' },
  { id: 'D01', name: 'Mỹ Đình Post', u: 2.2, v: 6.5, type: 'delivery', desc: 'Bưu cục phát' },
  { id: 'W03', name: 'Hà Đông DC', u: 3.5, v: 4.2, type: 'warehouse', desc: 'Kho trung chuyển' }
];

const NETWORK_EDGES = [
  { id: 'e1', u: 'W01', v: 'D01', w: 4.8 },
  { id: 'e2', u: 'D02', v: 'W02', w: 5.5 },
  { id: 'e3', u: 'H01', v: 'D02', w: 6.0 },
  { id: 'e4', u: 'W01', v: 'W02', w: 7.2 },
  { id: 'e5', u: 'W02', v: 'W03', w: 9.1 },
  { id: 'e6', u: 'W03', v: 'D01', w: 12.0 },
  { id: 'e7', u: 'H01', v: 'W02', w: 14.5 }
];

// Color palette for component clusters
const CLUSTER_COLORS = [
  '#3b82f6', // Cobalt
  '#f59e0b', // Amber
  '#10b981', // Emerald
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#06b6d4'  // Cyan
];

// =====================================================================
// STEP GENERATOR 1: KRUSKAL'S ALGORITHM (MST + DSU)
// =====================================================================
function buildKruskalSteps() {
  const steps = [];
  const nodes = NETWORK_NODES.map(n => ({ ...n }));
  const edges = NETWORK_EDGES.map(e => ({ ...e }));
  const numNodes = nodes.length;

  const sortedEdges = [...edges].sort((a, b) => a.w - b.w);
  const parent = {};
  nodes.forEach(n => parent[n.id] = n.id);

  function find(u) {
    if (parent[u] === u) return u;
    return parent[u] = find(parent[u]);
  }

  function getClusterColors() {
    const rootMap = {};
    let colorIdx = 0;
    nodes.forEach(n => {
      const r = find(n.id);
      if (!(r in rootMap)) {
        rootMap[r] = CLUSTER_COLORS[colorIdx % CLUSTER_COLORS.length];
        colorIdx++;
      }
    });
    return rootMap;
  }

  // Step 0: Init function
  steps.push({
    line: 1,
    vars: { p: 'None', turn: 'Khởi tạo', cross: '0.0 km', stack: [] },
    watch: { 'algorithm': 'Kruskal (DSU)', 'edges.sorted': `0 / ${edges.length}`, 'mst.count': `0 / ${numNodes - 1}`, 'total_cost': '0.0 km' },
    canvas: {
      nodes: nodes.map(n => ({ ...n, state: 'normal' })),
      edges: edges.map(e => ({ ...e, state: 'normal' })),
      candidateEdge: null,
      rejectedEdge: null,
      clusterRoots: { ...parent }
    },
    narrative: `Khởi tạo kruskal_mst(): Chuẩn bị duyệt ${edges.length} tuyến đường để tìm 5 tuyến trục MST tối ưu.`
  });

  // Step 1: Sort edges by weight
  steps.push({
    line: 2,
    vars: { p: `${sortedEdges[0].u}-${sortedEdges[0].v} (${sortedEdges[0].w}km)`, turn: 'SORT CẠNH ↑', cross: `${sortedEdges[0].w} km`, stack: [] },
    watch: { 'algorithm': 'Kruskal', 'edges.sorted': `7/7 [${sortedEdges.map(e=>e.w).join(', ')}]`, 'mst.count': '0/5', 'total_cost': '0.0 km' },
    canvas: {
      nodes: nodes.map(n => ({ ...n, state: 'normal' })),
      edges: edges.map(e => ({ ...e, state: 'normal' })),
      candidateEdge: null,
      rejectedEdge: null,
      clusterRoots: { ...parent }
    },
    narrative: `edges.sort(): Sắp xếp toàn bộ 7 tuyến đường theo trọng số tăng dần: [4.8, 5.5, 6.0, 7.2, 9.1, 12.0, 14.5] km.`
  });

  // Step 2: Initialize DSU
  steps.push({
    line: 3,
    vars: { p: 'DSU(6)', turn: '6 Cụm độc lập', cross: '0.0 km', stack: [] },
    watch: { 'dsu': '6 roots', 'components': '6 cụm', 'mst.count': '0/5', 'total_cost': '0.0 km' },
    canvas: {
      nodes: nodes.map(n => ({ ...n, state: 'normal' })),
      edges: edges.map(e => ({ ...e, state: 'normal' })),
      candidateEdge: null,
      rejectedEdge: null,
      clusterRoots: { ...parent }
    },
    narrative: `dsu = DSU(6): Khởi tạo 6 tập hợp rời rạc, mỗi trạm bưu cục là một cây độc lập.`
  });

  // Step 3: mst_edges = [], total_cost = 0.0
  steps.push({
    line: 4,
    vars: { p: 'mst = []', turn: 'Sẵn sàng', cross: '0.0 km', stack: [] },
    watch: { 'dsu': '6 roots', 'mst_edges': '[]', 'mst.count': '0/5', 'total_cost': '0.0 km' },
    canvas: {
      nodes: nodes.map(n => ({ ...n, state: 'normal' })),
      edges: edges.map(e => ({ ...e, state: 'normal' })),
      candidateEdge: null,
      rejectedEdge: null,
      clusterRoots: { ...parent }
    },
    narrative: `Khởi tạo danh sách cạnh cây khung mst_edges = [] và tổng chi phí total_cost = 0.0 km.`
  });

  const mst = [];
  let totalCost = 0.0;

  for (let idx = 0; idx < sortedEdges.length; idx++) {
    const e = sortedEdges[idx];

    // Candidate edge evaluated
    steps.push({
      line: 8,
      vars: { p: `(${e.u} ↔ ${e.v})`, turn: 'Xét cạnh nhẹ nhất', cross: `${e.w} km`, stack: mst.map(m => `${m.u}-${m.v} (${m.w}k)`) },
      watch: { 'edge': `(${e.u}, ${e.v})`, 'weight': `${e.w} km`, 'mst.count': `${mst.length}/5`, 'total_cost': `${totalCost.toFixed(1)} km` },
      canvas: {
        nodes: nodes.map(n => ({ ...n, state: (n.id === e.u || n.id === e.v) ? 'candidate' : (mst.some(m => m.u === n.id || m.v === n.id) ? 'mst' : 'normal') })),
        edges: edges.map(edgeItem => ({
          ...edgeItem,
          state: mst.some(m => m.id === edgeItem.id) ? 'mst' : (edgeItem.id === e.id ? 'candidate' : 'normal')
        })),
        candidateEdge: e,
        rejectedEdge: null,
        clusterRoots: { ...parent }
      },
      narrative: `Vòng for: Lấy cạnh nhẹ nhất tiếp theo (${e.u} ↔ ${e.v}, ${e.w} km). Chuẩn bị kiểm tra chu trình.`
    });

    const rootU = find(e.u);
    const rootV = find(e.v);

    if (rootU !== rootV) {
      // Find check passes
      steps.push({
        line: 9,
        vars: { p: `find(${e.u}) != find(${e.v})`, turn: '2 Cụm khác nhau ✓', cross: `${e.w} km`, stack: mst.map(m => `${m.u}-${m.v} (${m.w}k)`) },
        watch: { 'dsu.find(u)': rootU, 'dsu.find(v)': rootV, 'check': 'Không chu trình', 'total_cost': `${totalCost.toFixed(1)} km` },
        canvas: {
          nodes: nodes.map(n => ({ ...n, state: (n.id === e.u || n.id === e.v) ? 'candidate' : (mst.some(m => m.u === n.id || m.v === n.id) ? 'mst' : 'normal') })),
          edges: edges.map(edgeItem => ({
            ...edgeItem,
            state: mst.some(m => m.id === edgeItem.id) ? 'mst' : (edgeItem.id === e.id ? 'candidate' : 'normal')
          })),
          candidateEdge: e,
          rejectedEdge: null,
          clusterRoots: { ...parent }
        },
        narrative: `dsu.find(${e.u}) = [${rootU}] khác dsu.find(${e.v}) = [${rootV}]: Hai trạm thuộc 2 cụm riêng biệt, không tạo chu trình kín!`
      });

      // Union operation
      parent[rootU] = rootV;
      mst.push(e);
      totalCost += e.w;

      steps.push({
        line: 10,
        vars: { p: `union(${e.u}, ${e.v})`, turn: 'Gộp cụm DSU', cross: `${e.w} km`, stack: mst.map(m => `${m.u}-${m.v} (${m.w}k)`) },
        watch: { 'dsu.union': `gộp ${rootU} ➔ ${rootV}`, 'mst.count': `${mst.length}/5`, 'total_cost': `${totalCost.toFixed(1)} km` },
        canvas: {
          nodes: nodes.map(n => ({ ...n, state: mst.some(m => m.u === n.id || m.v === n.id) ? 'mst' : 'normal' })),
          edges: edges.map(edgeItem => ({
            ...edgeItem,
            state: mst.some(m => m.id === edgeItem.id) ? 'mst' : 'normal'
          })),
          candidateEdge: null,
          rejectedEdge: null,
          clusterRoots: { ...parent }
        },
        narrative: `dsu.union(${e.u}, ${e.v}): Hợp nhất 2 cụm chứa ${e.u} và ${e.v} lại với nhau thành 1 thành phần liên thông lớn hơn.`
      });

      // Append to MST
      steps.push({
        line: 11,
        vars: { p: `NẠP CẠNH MST`, turn: 'ACCEPT ✓', cross: `Tổng ${totalCost.toFixed(1)} km`, stack: mst.map(m => `${m.u}-${m.v} (${m.w}k)`) },
        watch: { 'mst_edges': `+(${e.u}-${e.v})`, 'mst.count': `${mst.length}/5`, 'total_cost': `${totalCost.toFixed(1)} km` },
        canvas: {
          nodes: nodes.map(n => ({ ...n, state: mst.some(m => m.u === n.id || m.v === n.id) ? 'mst' : 'normal' })),
          edges: edges.map(edgeItem => ({
            ...edgeItem,
            state: mst.some(m => m.id === edgeItem.id) ? 'mst' : 'normal'
          })),
          candidateEdge: null,
          rejectedEdge: null,
          clusterRoots: { ...parent }
        },
        narrative: `mst_edges.append(${e.u}-${e.v}): Kết nạp tuyến (${e.u} ↔ ${e.v}, ${e.w} km) vào cây MST. Tổng chi phí: ${totalCost.toFixed(1)} km.`
      });

      // Check early exit
      if (mst.length === numNodes - 1) {
        steps.push({
          line: 14,
          vars: { p: 'ĐỦ 5 CẠNH', turn: 'BREAK EARLY', cross: `Tổng ${totalCost.toFixed(1)} km`, stack: mst.map(m => `${m.u}-${m.v} (${m.w}k)`) },
          watch: { 'status': 'Đủ V - 1 cạnh', 'mst.count': '5/5', 'total_cost': `${totalCost.toFixed(1)} km` },
          canvas: {
            nodes: nodes.map(n => ({ ...n, state: 'mst' })),
            edges: edges.map(edgeItem => ({
              ...edgeItem,
              state: mst.some(m => m.id === edgeItem.id) ? 'mst' : 'normal'
            })),
            candidateEdge: null,
            rejectedEdge: null,
            clusterRoots: { ...parent }
          },
          narrative: `len(mst_edges) == 5 (V - 1): Đã kết nối đủ toàn bộ 6 trạm! Dừng sớm vòng lặp, bỏ qua các cạnh đắt tiền còn lại.`
        });
        break;
      }
    } else {
      // Cycle detected -> Rejected
      steps.push({
        line: 9,
        vars: { p: `find(${e.u}) == find(${e.v})`, turn: 'CHU TRÌNH ✕', cross: `${e.w} km`, stack: mst.map(m => `${m.u}-${m.v} (${m.w}k)`) },
        watch: { 'dsu.find': `cùng gốc [${rootU}]`, 'check': 'TẠO CHU TRÌNH', 'action': 'Loại bỏ cạnh' },
        canvas: {
          nodes: nodes.map(n => ({ ...n, state: (n.id === e.u || n.id === e.v) ? 'rejected' : (mst.some(m => m.u === n.id || m.v === n.id) ? 'mst' : 'normal') })),
          edges: edges.map(edgeItem => ({
            ...edgeItem,
            state: mst.some(m => m.id === edgeItem.id) ? 'mst' : (edgeItem.id === e.id ? 'rejected' : 'normal')
          })),
          candidateEdge: null,
          rejectedEdge: e,
          clusterRoots: { ...parent }
        },
        narrative: `dsu.find(${e.u}) == dsu.find(${e.v}) = [${rootU}]: Hai trạm đã cùng thuộc 1 cụm! Tuyến (${e.u} ↔ ${e.v}) tạo chu trình kín dư thừa nên bị loại bỏ!`
      });
    }
  }

  // Final step: Return MST
  steps.push({
    line: 15,
    vars: { p: 'HOÀN THÀNH', turn: 'MST TỐI ƯU', cross: `Tổng ${totalCost.toFixed(1)} km`, stack: mst.map(m => `${m.u}-${m.v} (${m.w}k)`) },
    watch: { 'status': 'MST hoàn chỉnh', 'mst_edges': '5 cạnh', 'total_cost': `${totalCost.toFixed(1)} km` },
    canvas: {
      nodes: nodes.map(n => ({ ...n, state: 'mst' })),
      edges: edges.map(edgeItem => ({
        ...edgeItem,
        state: mst.some(m => m.id === edgeItem.id) ? 'mst' : 'normal'
      })),
      candidateEdge: null,
      rejectedEdge: null,
      clusterRoots: { ...parent },
      isFinished: true
    },
    narrative: `return mst_edges, total_cost: Hoàn thành giải thuật Kruskal! Cây bao trùm gồm đúng 5 cạnh với tổng chi phí tối ưu: ${totalCost.toFixed(1)} km.`
  });

  return { steps, nodes, edges };
}

// =====================================================================
// STEP GENERATOR 2: PRIM'S ALGORITHM (MIN-HEAP + CUT PROPERTY)
// =====================================================================
function buildPrimSteps() {
  const steps = [];
  const nodes = NETWORK_NODES.map(n => ({ ...n }));
  const edges = NETWORK_EDGES.map(e => ({ ...e }));
  const numNodes = nodes.length;

  const adj = {};
  nodes.forEach(n => adj[n.id] = []);
  edges.forEach(e => {
    adj[e.u].push({ v: e.v, w: e.w, edgeId: e.id });
    adj[e.v].push({ v: e.u, w: e.w, edgeId: e.id });
  });

  const startNode = 'H01'; // Root at Long Biên Mega Hub
  const visited = new Set([startNode]);
  const mst = [];
  let totalCost = 0.0;

  // Step 0: Init function
  steps.push({
    line: 1,
    vars: { p: `start = ${startNode}`, turn: 'Khởi tạo', cross: '0.0 km', stack: [startNode] },
    watch: { 'algorithm': 'Prim (Min-Heap)', 'start_node': startNode, 'visited': `{${startNode}}`, 'total_cost': '0.0 km' },
    canvas: {
      nodes: nodes.map(n => ({ ...n, state: n.id === startNode ? 'root' : 'normal' })),
      edges: edges.map(e => ({ ...e, state: 'normal' })),
      candidateEdge: null,
      cutEdges: [],
      visitedSet: new Set(visited)
    },
    narrative: `Khởi tạo prim_mst(): Chọn trạm đầu não Long Biên Mega Hub (${startNode}) làm gốc xuất phát của cây liên thông.`
  });

  // Step 1: visited = {start_node}
  steps.push({
    line: 2,
    vars: { p: `visited = {${startNode}}`, turn: 'Tập S (Cây)', cross: '0.0 km', stack: [startNode] },
    watch: { 'visited.size': '1 / 6', 'tree_nodes': `[${startNode}]`, 'total_cost': '0.0 km' },
    canvas: {
      nodes: nodes.map(n => ({ ...n, state: n.id === startNode ? 'root' : 'normal' })),
      edges: edges.map(e => ({ ...e, state: 'normal' })),
      candidateEdge: null,
      cutEdges: [],
      visitedSet: new Set(visited)
    },
    narrative: `visited = {${startNode}}: Đưa trạm ${startNode} vào tập S. Cây MST bắt đầu phát triển từ đỉnh này.`
  });

  // Step 2: Push initial edges across cut into Min-Heap
  const initialCut = adj[startNode].map(neighbor => ({ u: startNode, v: neighbor.v, w: neighbor.w, id: neighbor.edgeId }));
  steps.push({
    line: 3,
    vars: { p: `pq.push(${initialCut.length} cạnh kề)`, turn: 'Lát cắt S ↔ V\\S', cross: `${initialCut.length} cạnh`, stack: [startNode] },
    watch: { 'pq.size': `${initialCut.length}`, 'cut_edges': initialCut.map(e=>`${e.u}-${e.v}:${e.w}`).join(', '), 'total_cost': '0.0 km' },
    canvas: {
      nodes: nodes.map(n => ({ ...n, state: n.id === startNode ? 'root' : 'normal' })),
      edges: edges.map(e => ({
        ...e,
        state: initialCut.some(c => c.id === e.id) ? 'candidate' : 'normal'
      })),
      candidateEdge: null,
      cutEdges: initialCut,
      visitedSet: new Set(visited)
    },
    narrative: `Nạp toàn bộ các cạnh kề từ ${startNode} băng qua lát cắt vào Min-Heap: (${startNode}-D02: 6.0km, ${startNode}-W02: 14.5km).`
  });

  // Step sequence for Prim progression
  const primRounds = [
    { edge: { u: 'H01', v: 'D02', w: 6.0, id: 'e3' }, nxt: 'D02' },
    { edge: { u: 'D02', v: 'W02', w: 5.5, id: 'e2' }, nxt: 'W02' },
    { edge: { u: 'W02', v: 'W01', w: 7.2, id: 'e4' }, nxt: 'W01' },
    { edge: { u: 'W01', v: 'D01', w: 4.8, id: 'e1' }, nxt: 'D01' },
    { edge: { u: 'W02', v: 'W03', w: 9.1, id: 'e5' }, nxt: 'W03' }
  ];

  primRounds.forEach((round, rIdx) => {
    const e = round.edge;

    // Pop min edge from heap (Line 9)
    steps.push({
      line: 9,
      vars: { p: `heappop() = (${e.u} ↔ ${e.v})`, turn: 'Rẻ nhất qua lát cắt', cross: `${e.w} km`, stack: Array.from(visited) },
      watch: { 'popped_edge': `(${e.u}, ${e.v})`, 'weight': `${e.w} km`, 'dest_node': round.nxt, 'total_cost': `${totalCost.toFixed(1)} km` },
      canvas: {
        nodes: nodes.map(n => ({
          ...n,
          state: visited.has(n.id) ? 'mst' : (n.id === round.nxt ? 'candidate' : 'normal')
        })),
        edges: edges.map(edgeItem => ({
          ...edgeItem,
          state: mst.some(m => m.id === edgeItem.id) ? 'mst' : (edgeItem.id === e.id ? 'candidate' : 'normal')
        })),
        candidateEdge: e,
        visitedSet: new Set(visited)
      },
      narrative: `heappop(): Lấy cạnh có chi phí rẻ nhất hiện tại trong Min-Heap (${e.u} ↔ ${e.v}, ${e.w} km) nối ra trạm chưa thăm ${round.nxt}.`
    });

    // Check if destination not visited (Line 10)
    steps.push({
      line: 10,
      vars: { p: `${round.nxt} ∉ visited`, turn: 'Đỉnh mới hợp lệ ✓', cross: `${e.w} km`, stack: Array.from(visited) },
      watch: { 'check_visited': `${round.nxt} chưa vào cây`, 'action': 'Kết nạp vào cây', 'total_cost': `${totalCost.toFixed(1)} km` },
      canvas: {
        nodes: nodes.map(n => ({
          ...n,
          state: visited.has(n.id) ? 'mst' : (n.id === round.nxt ? 'candidate' : 'normal')
        })),
        edges: edges.map(edgeItem => ({
          ...edgeItem,
          state: mst.some(m => m.id === edgeItem.id) ? 'mst' : (edgeItem.id === e.id ? 'candidate' : 'normal')
        })),
        candidateEdge: e,
        visitedSet: new Set(visited)
      },
      narrative: `Trạm ${round.nxt} chưa thuộc tập visited! Thỏa mãn Tính chất lát cắt (Cut Property): Cạnh rẻ nhất chắc chắn thuộc MST.`
    });

    // Add node to visited & append edge to MST (Line 11-12)
    visited.add(round.nxt);
    mst.push(e);
    totalCost += e.w;

    steps.push({
      line: 12,
      vars: { p: `NẠP (${e.u}-${e.v})`, turn: 'ACCEPT ✓', cross: `Tổng ${totalCost.toFixed(1)} km`, stack: Array.from(visited) },
      watch: { 'visited.size': `${visited.size}/6`, 'mst.count': `${mst.length}/5`, 'total_cost': `${totalCost.toFixed(1)} km` },
      canvas: {
        nodes: nodes.map(n => ({
          ...n,
          state: visited.has(n.id) ? 'mst' : 'normal'
        })),
        edges: edges.map(edgeItem => ({
          ...edgeItem,
          state: mst.some(m => m.id === edgeItem.id) ? 'mst' : 'normal'
        })),
        candidateEdge: null,
        visitedSet: new Set(visited)
      },
      narrative: `visited.add(${round.nxt}) & mst_edges.append(${e.u}-${e.v}): Cây mở rộng thêm trạm ${round.nxt}. Tổng chi phí: ${totalCost.toFixed(1)} km.`
    });

    // Push new outgoing edges to heap (Line 14-16)
    if (rIdx < primRounds.length - 1) {
      steps.push({
        line: 16,
        vars: { p: `heappush(cạnh từ ${round.nxt})`, turn: 'Cập nhật lát cắt', cross: `Tổng ${totalCost.toFixed(1)} km`, stack: Array.from(visited) },
        watch: { 'tree_size': `${visited.size} trạm`, 'mst.count': `${mst.length}/5`, 'total_cost': `${totalCost.toFixed(1)} km` },
        canvas: {
          nodes: nodes.map(n => ({
            ...n,
            state: visited.has(n.id) ? 'mst' : 'normal'
          })),
          edges: edges.map(edgeItem => ({
            ...edgeItem,
            state: mst.some(m => m.id === edgeItem.id) ? 'mst' : 'normal'
          })),
          candidateEdge: null,
          visitedSet: new Set(visited)
        },
        narrative: `Quét các cạnh kề mới từ trạm ${round.nxt} nối ra các đỉnh chưa thăm và đẩy vào Min-Heap để chuẩn bị cho bước kế tiếp.`
      });
    }
  });

  // Final step: return MST
  steps.push({
    line: 17,
    vars: { p: 'HOÀN THÀNH', turn: 'CÂY LIÊN THÔNG', cross: `Tổng ${totalCost.toFixed(1)} km`, stack: Array.from(visited) },
    watch: { 'status': 'Cây MST hoàn chỉnh', 'visited': '6/6 trạm', 'mst.count': '5/5', 'total_cost': `${totalCost.toFixed(1)} km` },
    canvas: {
      nodes: nodes.map(n => ({ ...n, state: 'mst' })),
      edges: edges.map(edgeItem => ({
        ...edgeItem,
        state: mst.some(m => m.id === edgeItem.id) ? 'mst' : 'normal'
      })),
      candidateEdge: null,
      visitedSet: new Set(visited),
      isFinished: true
    },
    narrative: `return mst_edges, total_cost: Cây Prim đã nuốt trọn toàn bộ 6 trạm thành một cây duy nhất liên tục với tổng chi phí ${totalCost.toFixed(1)} km.`
  });

  return { steps, nodes, edges };
}

// =====================================================================
// STEP GENERATOR 3: BORŮVKA'S ALGORITHM (PARALLEL REDUCTION)
// =====================================================================
function buildBoruvkaSteps() {
  const steps = [];
  const nodes = NETWORK_NODES.map(n => ({ ...n }));
  const edges = NETWORK_EDGES.map(e => ({ ...e }));
  const numNodes = nodes.length;

  const parent = {};
  nodes.forEach(n => parent[n.id] = n.id);

  function find(u) {
    if (parent[u] === u) return u;
    return parent[u] = find(parent[u]);
  }

  // Step 0: Init
  steps.push({
    line: 1,
    vars: { p: 'Vòng 0', turn: 'Khởi tạo', cross: '0.0 km', stack: ['H01', 'D02', 'W02', 'W01', 'D01', 'W03'] },
    watch: { 'algorithm': 'Borůvka (1926)', 'rounds': '0', 'components': '6 cụm rời rạc', 'parallel': 'Sẵn sàng' },
    canvas: {
      nodes: nodes.map(n => ({ ...n, state: 'normal' })),
      edges: edges.map(e => ({ ...e, state: 'normal' })),
      candidateEdge: null,
      cheapestEdges: [],
      clusterRoots: { ...parent }
    },
    narrative: 'Khởi tạo boruvka_mst(): Thuật toán giải quyết theo từng vòng (Round), thích hợp tính toán song song trên GPU hoặc phân tán.'
  });

  // Step 1: dsu = DSU(num_nodes) & num_components = 6
  steps.push({
    line: 4,
    vars: { p: 'components = 6', turn: '6 Cụm riêng rẽ', cross: '0.0 km', stack: ['Cụm 1..6'] },
    watch: { 'num_components': '6', 'rounds_max': '≤ ⌈log₂ 6⌉ = 3', 'mst.count': '0/5' },
    canvas: {
      nodes: nodes.map(n => ({ ...n, state: 'normal' })),
      edges: edges.map(e => ({ ...e, state: 'normal' })),
      candidateEdge: null,
      cheapestEdges: [],
      clusterRoots: { ...parent }
    },
    narrative: `Khởi tạo 6 thành phần liên thông độc lập. Số vòng tối đa không quá ⌈log₂ 6⌉ = 3 vòng.`
  });

  // ===================== ROUND 1 =====================
  // Round 1 start: cheapest = {}
  steps.push({
    line: 7,
    vars: { p: 'VÒNG 1 (PARALLEL)', turn: 'Tìm cạnh rẻ nhất', cross: '6 cụm', stack: ['W01', 'D01', 'D02', 'W02', 'H01', 'W03'] },
    watch: { 'round': 'Vòng 1', 'components': '6 cụm', 'action': 'Quét song song' },
    canvas: {
      nodes: nodes.map(n => ({ ...n, state: 'normal' })),
      edges: edges.map(e => ({ ...e, state: 'normal' })),
      candidateEdge: null,
      cheapestEdges: [],
      clusterRoots: { ...parent }
    },
    narrative: `[VÒNG 1] Bắt đầu tìm kiếm song song: Với MỌI cụm trong 6 cụm, đồng thời tìm cạnh rẻ nhất nối ra ngoài cụm đó.`
  });

  // Round 1 parallel cheapest selection:
  // W01 picks W01-D01 (4.8)
  // D02 picks D02-W02 (5.5)
  // H01 picks H01-D02 (6.0)
  // W03 picks W02-W03 (9.1)
  const round1Cheapest = [
    { id: 'e1', u: 'W01', v: 'D01', w: 4.8 },
    { id: 'e2', u: 'D02', v: 'W02', w: 5.5 },
    { id: 'e3', u: 'H01', v: 'D02', w: 6.0 },
    { id: 'e5', u: 'W02', v: 'W03', w: 9.1 }
  ];

  steps.push({
    line: 11,
    vars: { p: '4 Cạnh Rẻ Nhất', turn: 'SONG SONG ✦', cross: '4.8, 5.5, 6.0, 9.1', stack: round1Cheapest.map(e => `${e.u}-${e.v}`) },
    watch: { 'cheapest[W01]': 'W01-D01 (4.8)', 'cheapest[D02]': 'D02-W02 (5.5)', 'cheapest[H01]': 'H01-D02 (6.0)', 'cheapest[W03]': 'W02-W03 (9.1)' },
    canvas: {
      nodes: nodes.map(n => ({ ...n, state: 'candidate' })),
      edges: edges.map(e => ({
        ...e,
        state: round1Cheapest.some(c => c.id === e.id) ? 'candidate' : 'normal'
      })),
      candidateEdge: null,
      cheapestEdges: round1Cheapest,
      clusterRoots: { ...parent }
    },
    narrative: `Tất cả 6 cụm đồng thời phát hiện cạnh rẻ nhất của mình: 4 tuyến (4.8km, 5.5km, 6.0km, 9.1km) đồng loạt được chọn!`
  });

  // Round 1 parallel union:
  round1Cheapest.forEach(e => {
    parent[find(e.u)] = find(e.v);
  });
  let mst = [...round1Cheapest];
  let totalCost = round1Cheapest.reduce((acc, cur) => acc + cur.w, 0);

  steps.push({
    line: 13,
    vars: { p: 'DSU UNION x4', turn: 'GỘP SONG SONG', cross: `Tổng ${totalCost.toFixed(1)} km`, stack: mst.map(e => `${e.u}-${e.v}`) },
    watch: { 'round': 'Vòng 1 (Xong)', 'components': '6 ➔ 2 cụm', 'mst.count': '4/5', 'total_cost': `${totalCost.toFixed(1)} km` },
    canvas: {
      nodes: nodes.map(n => ({ ...n, state: 'mst' })),
      edges: edges.map(e => ({
        ...e,
        state: mst.some(m => m.id === e.id) ? 'mst' : 'normal'
      })),
      candidateEdge: null,
      cheapestEdges: [],
      clusterRoots: { ...parent }
    },
    narrative: `dsu.union(): Gộp đồng thời 4 cạnh vào cây khung! Số cụm giảm mạnh ít nhất 50%: từ 6 cụm xuống chỉ còn 2 cụm lớn.`
  });

  // ===================== ROUND 2 =====================
  // Round 2 start:
  steps.push({
    line: 7,
    vars: { p: 'VÒNG 2 (PARALLEL)', turn: '2 Cụm Lớn', cross: '2 cụm', stack: ['Cụm A', 'Cụm B'] },
    watch: { 'round': 'Vòng 2', 'components': '2 cụm', 'action': 'Tìm cầu nối' },
    canvas: {
      nodes: nodes.map(n => ({ ...n, state: 'mst' })),
      edges: edges.map(e => ({
        ...e,
        state: mst.some(m => m.id === e.id) ? 'mst' : 'normal'
      })),
      candidateEdge: null,
      cheapestEdges: [],
      clusterRoots: { ...parent }
    },
    narrative: `[VÒNG 2] Hiện chỉ còn 2 cụm lớn. Cả hai cụm đồng thời tìm tuyến đường ngắn nhất bắc cầu qua cụm kia.`
  });

  // Round 2 cheapest edge: e4 (W01-W02, 7.2)
  const round2Cheapest = [{ id: 'e4', u: 'W01', v: 'W02', w: 7.2 }];

  steps.push({
    line: 11,
    vars: { p: 'Cầu (W01 ↔ W02)', turn: 'CẠNH RẺ NHẤT', cross: '7.2 km', stack: ['W01-W02 (7.2km)'] },
    watch: { 'cheapest[Cụm A]': 'W01-W02 (7.2)', 'cheapest[Cụm B]': 'W01-W02 (7.2)', 'mst.count': '4/5' },
    canvas: {
      nodes: nodes.map(n => ({ ...n, state: 'mst' })),
      edges: edges.map(e => ({
        ...e,
        state: mst.some(m => m.id === e.id) ? 'mst' : (round2Cheapest.some(c => c.id === e.id) ? 'candidate' : 'normal')
      })),
      candidateEdge: round2Cheapest[0],
      cheapestEdges: round2Cheapest,
      clusterRoots: { ...parent }
    },
    narrative: `Cả hai cụm đều chọn tuyến W01 ↔ W02 (7.2 km) vì rẻ hơn tuyến W03 ↔ D01 (12.0 km) và H01 ↔ W02 (14.5 km).`
  });

  // Union round 2
  parent[find('W01')] = find('W02');
  mst.push(round2Cheapest[0]);
  totalCost += round2Cheapest[0].w;

  steps.push({
    line: 14,
    vars: { p: 'GỘP VÒNG 2', turn: 'ACCEPT ✓', cross: `Tổng ${totalCost.toFixed(1)} km`, stack: mst.map(e => `${e.u}-${e.v}`) },
    watch: { 'round': 'Vòng 2 (Xong)', 'components': '2 ➔ 1 CÂY', 'mst.count': '5/5', 'total_cost': `${totalCost.toFixed(1)} km` },
    canvas: {
      nodes: nodes.map(n => ({ ...n, state: 'mst' })),
      edges: edges.map(e => ({
        ...e,
        state: mst.some(m => m.id === e.id) ? 'mst' : 'normal'
      })),
      candidateEdge: null,
      cheapestEdges: [],
      clusterRoots: { ...parent }
    },
    narrative: `mst_edges.append(W01-W02): Kết nạp cạnh cuối cùng. Hai cụm hòa làm 1 cây MST duy nhất liên thông toàn mạng!`
  });

  // Final step
  steps.push({
    line: 16,
    vars: { p: 'HOÀN THÀNH', turn: '1 CỤM DUY NHẤT', cross: `Tổng ${totalCost.toFixed(1)} km`, stack: mst.map(e => `${e.u}-${e.v}`) },
    watch: { 'status': 'Hoàn tất Borůvka', 'total_rounds': 'Đúng 2 vòng!', 'mst.count': '5/5', 'total_cost': `${totalCost.toFixed(1)} km` },
    canvas: {
      nodes: nodes.map(n => ({ ...n, state: 'mst' })),
      edges: edges.map(e => ({
        ...e,
        state: mst.some(m => m.id === e.id) ? 'mst' : 'normal'
      })),
      candidateEdge: null,
      cheapestEdges: [],
      clusterRoots: { ...parent },
      isFinished: true
    },
    narrative: `return mst_edges: Giải thuật Borůvka kết thúc chỉ sau 2 vòng song song! Đạt kết quả tối ưu 32.6 km.`
  });

  return { steps, nodes, edges };
}

// 2.5D Isometric Coordinate Transformation
function projectPoint(u, v, viewMode = 'iso') {
  if (viewMode === '2d') {
    const nodeX = 420 + (u - 4.0) * 82;
    const nodeY = 225 + (v - 4.0) * 48;
    return { nodeX, nodeY, floorX: nodeX, floorY: nodeY };
  }

  // 2.5D Isometric Transformation (U, V in [0, 8])
  const centerX = 420;
  const platformY = 85;
  const tileDx = 38;
  const tileDy = 20;

  const floorX = centerX + (u - v) * tileDx;
  const floorY = platformY + (u + v) * tileDy;

  // Floating elevation in 2.5D space (Z = 28px)
  const elevationZ = 28;
  const nodeX = floorX;
  const nodeY = floorY - elevationZ;

  return { nodeX, nodeY, floorX, floorY };
}

// Initialize Interactive Visualizer
function initAlgorithmVisualizer() {
  setupAlgoTabs();
  setupViewControls();
  setupExecutionControls();
  switchAlgorithm('kruskal'); // Kruskal as default featured
}

// Switch Algorithm Suite
function switchAlgorithm(algoId) {
  if (!ALGO_CONFIGS[algoId]) return;

  vizState.currentAlgo = algoId;
  const config = ALGO_CONFIGS[algoId];

  // Update Top Bar Metadata
  const titleEl = document.getElementById('algoMainTitle');
  const descEl = document.getElementById('algoMainDesc');
  const timeEl = document.getElementById('algoTimeComp');
  const spaceEl = document.getElementById('algoSpaceComp');
  const filenameEl = document.getElementById('macosFilename');

  if (titleEl) titleEl.textContent = config.name;
  if (descEl) descEl.textContent = config.description;
  if (timeEl) timeEl.textContent = config.timeComp;
  if (spaceEl) spaceEl.textContent = config.spaceComp;
  if (filenameEl) filenameEl.textContent = config.filename;

  // Update Algo Tab active pill
  document.querySelectorAll('.algo-tab-btn').forEach(btn => {
    if (btn.dataset.algo === algoId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Dynamic variable labels according to algorithm semantics
  const varPName = document.querySelector('#stateVarP .var-name');
  const varTurnName = document.querySelector('#stateVarTurn .var-name');
  const varCrossName = document.querySelector('#stateVarCross .var-name');
  const stackLabel = document.getElementById('stackLabel');

  if (algoId === 'kruskal') {
    if (varPName) varPName.textContent = 'edge';
    if (varTurnName) varTurnName.textContent = 'dsu_check';
    if (varCrossName) varCrossName.textContent = 'weight';
    if (stackLabel) stackLabel.textContent = 'MST EDGES:';
  } else if (algoId === 'prim') {
    if (varPName) varPName.textContent = 'min_edge';
    if (varTurnName) varTurnName.textContent = 'cut_check';
    if (varCrossName) varCrossName.textContent = 'weight';
    if (stackLabel) stackLabel.textContent = 'VISITED:';
  } else if (algoId === 'boruvka') {
    if (varPName) varPName.textContent = 'round';
    if (varTurnName) varTurnName.textContent = 'parallel_op';
    if (varCrossName) varCrossName.textContent = 'components';
    if (stackLabel) stackLabel.textContent = 'CHEAPEST:';
  }

  // Generate Steps according to algorithm
  if (algoId === 'kruskal') {
    const res = buildKruskalSteps();
    vizState.steps = res.steps;
  } else if (algoId === 'prim') {
    const res = buildPrimSteps();
    vizState.steps = res.steps;
  } else if (algoId === 'boruvka') {
    const res = buildBoruvkaSteps();
    vizState.steps = res.steps;
  }

  // Render Code Editor body
  renderCodeEditor(algoId);

  // Reset to Step 0
  vizState.stepIndex = 0;
  pauseAutoPlay();
  renderCurrentStep();
}

// Render Code Editor Body with Syntax Tokens & Line Numbers
function renderCodeEditor(algoId) {
  const gutter = document.getElementById('codeGutter');
  const container = document.getElementById('codeLinesContainer');
  if (!gutter || !container) return;

  gutter.innerHTML = '';
  container.innerHTML = '';

  const config = ALGO_CONFIGS[algoId];
  config.codeLines.forEach(line => {
    const numEl = document.createElement('div');
    numEl.className = 'gutter-num';
    numEl.id = `gutterNum_${line.num}`;
    numEl.textContent = String(line.num).padStart(2, '0');
    gutter.appendChild(numEl);

    const lineEl = document.createElement('div');
    lineEl.className = 'code-line';
    lineEl.id = `codeLine_${line.num}`;
    lineEl.innerHTML = line.html;
    container.appendChild(lineEl);
  });
}

// Render Current Step (State Synchronization)
function renderCurrentStep() {
  if (!vizState.steps.length) return;
  const step = vizState.steps[vizState.stepIndex];
  if (!step) return;

  // 1. Highlight Active Code Line in macOS Window
  document.querySelectorAll('.code-line').forEach(el => el.classList.remove('active-line'));
  document.querySelectorAll('.gutter-num').forEach(el => el.classList.remove('active'));

  const activeLineEl = document.getElementById(`codeLine_${step.line}`);
  const activeGutterEl = document.getElementById(`gutterNum_${step.line}`);
  if (activeLineEl) {
    activeLineEl.classList.add('active-line');
    activeLineEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  if (activeGutterEl) activeGutterEl.classList.add('active');

  const lineIndicator = document.getElementById('activeLineIndicator');
  if (lineIndicator) lineIndicator.textContent = `Line ${String(step.line).padStart(2, '0')}`;

  // 2. Update State Bar Variables
  const varPEl = document.getElementById('varPVal');
  const varTurnEl = document.getElementById('varTurnVal');
  const varCrossEl = document.getElementById('varCrossVal');

  if (varPEl) varPEl.textContent = step.vars.p || '-';
  if (varTurnEl) {
    varTurnEl.textContent = step.vars.turn || '-';
    varTurnEl.className = 'var-val';
    if (step.vars.turn && (step.vars.turn.includes('ACCEPT') || step.vars.turn.includes('Khác') || step.vars.turn.includes('SONG SONG') || step.vars.turn.includes('TỐI ƯU') || step.vars.turn.includes('✓'))) {
      varTurnEl.classList.add('ccw');
    }
    if (step.vars.turn && (step.vars.turn.includes('CHU TRÌNH') || step.vars.turn.includes('✕') || step.vars.turn.includes('TỪ CHỐI'))) {
      varTurnEl.classList.add('cw');
    }
  }
  if (varCrossEl) varCrossEl.textContent = step.vars.cross || '0.0';

  // 3. Update Result Stack / Array Badges Trail
  const stackTrailEl = document.getElementById('stackBadgeTrail');
  const stackLabelEl = document.getElementById('stackLabel');
  if (stackLabelEl) {
    if (vizState.currentAlgo === 'kruskal') stackLabelEl.textContent = 'MST EDGES:';
    else if (vizState.currentAlgo === 'prim') stackLabelEl.textContent = 'VISITED:';
    else stackLabelEl.textContent = 'CHEAPEST:';
  }

  if (stackTrailEl) {
    stackTrailEl.innerHTML = '';
    if (!step.vars.stack || step.vars.stack.length === 0) {
      stackTrailEl.innerHTML = `<span class="stack-empty-hint">Chưa nạp phần tử</span>`;
    } else {
      step.vars.stack.forEach((item, idx) => {
        if (idx > 0) {
          const sep = document.createElement('span');
          sep.className = 'stack-arrow-sep';
          sep.textContent = '➔';
          stackTrailEl.appendChild(sep);
        }

        const badge = document.createElement('span');
        badge.className = 'stack-badge';
        if (idx === step.vars.stack.length - 1) badge.classList.add('top-item');

        badge.textContent = item;
        stackTrailEl.appendChild(badge);
      });
    }
  }

  // 4. Update Variables Watch Table in macOS Footer
  const watchGrid = document.getElementById('varInspectorGrid');
  if (watchGrid && step.watch) {
    watchGrid.innerHTML = '';
    Object.keys(step.watch).forEach(key => {
      const row = document.createElement('div');
      row.className = 'var-grid-row';
      row.innerHTML = `<span class="k">${key}</span><span class="v" title="${step.watch[key]}">${step.watch[key]}</span>`;
      watchGrid.appendChild(row);
    });
  }

  // 5. Update Narrative Bar
  const narrativeEl = document.getElementById('algoNarrativeText');
  if (narrativeEl) narrativeEl.textContent = step.narrative;

  // 6. Update Scrubber & Counter Badges
  const counterEl = document.getElementById('stepCounterBadge');
  const scrubber = document.getElementById('stepScrubber');
  if (counterEl) {
    counterEl.textContent = `Step ${String(vizState.stepIndex + 1).padStart(2, '0')} / ${String(vizState.steps.length).padStart(2, '0')}`;
  }
  if (scrubber) {
    scrubber.max = vizState.steps.length - 1;
    scrubber.value = vizState.stepIndex;
  }

  // Update Prev / Next Button disabled states
  const prevBtn = document.getElementById('ctrlPrevStepBtn');
  const nextBtn = document.getElementById('ctrlNextStepBtn');
  if (prevBtn) prevBtn.disabled = vizState.stepIndex === 0;
  if (nextBtn) nextBtn.disabled = vizState.stepIndex === vizState.steps.length - 1;

  // 7. Render 2.5D Isometric Canvas
  renderIsometricCanvas(step.canvas);
}

// Render 2.5D Isometric Canvas for MST Logistics Network
function renderIsometricCanvas(cState) {
  const svg = document.getElementById('algoIsoSvg');
  if (!svg) return;

  const shadowGrp = document.getElementById('isoPlatformShadowGroup');
  const podiumGrp = document.getElementById('isoPodiumSidesGroup');
  const floorGrp = document.getElementById('isoPlatformFloorGroup');
  const gridGrp = document.getElementById('isoGridLinesGroup');
  const shadowsGrp = document.getElementById('isoFloorShadowsGroup');
  const hullFillGrp = document.getElementById('isoHullFillGroup');
  const connGrp = document.getElementById('isoConnectionsGroup');
  const tethersGrp = document.getElementById('isoTethersGroup');
  const nodesGrp = document.getElementById('isoNodesGroup');
  const overlayGrp = document.getElementById('isoOverlayLabelsGroup');

  if (!floorGrp || !gridGrp || !nodesGrp) return;

  // Clear layers
  if (shadowGrp) shadowGrp.innerHTML = '';
  if (podiumGrp) podiumGrp.innerHTML = '';
  floorGrp.innerHTML = '';
  gridGrp.innerHTML = '';
  if (shadowsGrp) shadowsGrp.innerHTML = '';
  if (hullFillGrp) hullFillGrp.innerHTML = '';
  if (connGrp) connGrp.innerHTML = '';
  if (tethersGrp) tethersGrp.innerHTML = '';
  nodesGrp.innerHTML = '';
  if (overlayGrp) overlayGrp.innerHTML = '';

  const isIso = vizState.viewMode === 'iso';

  // 1. Draw Platform Base & 3D Podium
  if (isIso) {
    if (shadowGrp) {
      const pShadow = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      pShadow.setAttribute('cx', '420');
      pShadow.setAttribute('cy', '410');
      pShadow.setAttribute('rx', '330');
      pShadow.setAttribute('ry', '75');
      pShadow.setAttribute('fill', 'rgba(0, 0, 0, 0.65)');
      pShadow.setAttribute('filter', 'url(#platformShadow)');
      shadowGrp.appendChild(pShadow);
    }

    if (podiumGrp) {
      const leftFace = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      leftFace.setAttribute('points', '116,245 420,405 420,428 116,268');
      leftFace.setAttribute('fill', 'url(#podiumLeftFace)');
      leftFace.setAttribute('stroke', 'rgba(56, 189, 248, 0.15)');
      leftFace.setAttribute('stroke-width', '1');
      podiumGrp.appendChild(leftFace);

      const rightFace = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      rightFace.setAttribute('points', '420,405 724,245 724,268 420,428');
      rightFace.setAttribute('fill', 'url(#podiumRightFace)');
      rightFace.setAttribute('stroke', 'rgba(56, 189, 248, 0.08)');
      rightFace.setAttribute('stroke-width', '1');
      podiumGrp.appendChild(rightFace);
    }

    const floorDiamond = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    floorDiamond.setAttribute('points', '420,85 724,245 420,405 116,245');
    floorDiamond.setAttribute('fill', 'url(#platformSpotlight)');
    floorDiamond.setAttribute('stroke', 'rgba(56, 189, 248, 0.35)');
    floorDiamond.setAttribute('stroke-width', '1.5');
    floorGrp.appendChild(floorDiamond);

    // Isometric Grid Lines
    for (let u = 0; u <= 8; u++) {
      const pStart = projectPoint(u, 0, 'iso');
      const pEnd = projectPoint(u, 8, 'iso');
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', pStart.floorX);
      line.setAttribute('y1', pStart.floorY);
      line.setAttribute('x2', pEnd.floorX);
      line.setAttribute('y2', pEnd.floorY);
      line.setAttribute('stroke', u === 4 ? 'rgba(56, 189, 248, 0.22)' : 'rgba(255, 255, 255, 0.05)');
      line.setAttribute('stroke-width', u === 4 ? '1.4' : '0.8');
      gridGrp.appendChild(line);
    }

    for (let v = 0; v <= 8; v++) {
      const pStart = projectPoint(0, v, 'iso');
      const pEnd = projectPoint(8, v, 'iso');
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', pStart.floorX);
      line.setAttribute('y1', pStart.floorY);
      line.setAttribute('x2', pEnd.floorX);
      line.setAttribute('y2', pEnd.floorY);
      line.setAttribute('stroke', v === 4 ? 'rgba(56, 189, 248, 0.22)' : 'rgba(255, 255, 255, 0.05)');
      line.setAttribute('stroke-width', v === 4 ? '1.4' : '0.8');
      gridGrp.appendChild(line);
    }
  } else {
    // 2D Orthographic Mode Background Grid
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', '70');
    rect.setAttribute('y', '35');
    rect.setAttribute('width', '700');
    rect.setAttribute('height', '390');
    rect.setAttribute('rx', '8');
    rect.setAttribute('fill', 'url(#platformSpotlight)');
    rect.setAttribute('stroke', 'rgba(56, 189, 248, 0.35)');
    floorGrp.appendChild(rect);

    for (let i = 0; i <= 8; i++) {
      const x = 420 + (i - 4) * 82;
      const vLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      vLine.setAttribute('x1', x);
      vLine.setAttribute('y1', '35');
      vLine.setAttribute('x2', x);
      vLine.setAttribute('y2', '425');
      vLine.setAttribute('stroke', 'rgba(255, 255, 255, 0.06)');
      gridGrp.appendChild(vLine);

      const y = 225 + (i - 4) * 48;
      const hLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      hLine.setAttribute('x1', '70');
      hLine.setAttribute('y1', y);
      hLine.setAttribute('x2', '770');
      hLine.setAttribute('y2', y);
      hLine.setAttribute('stroke', 'rgba(255, 255, 255, 0.06)');
      gridGrp.appendChild(hLine);
    }
  }

  // Pre-calculate projected nodes
  const projectedNodes = cState.nodes.map(n => {
    const proj = projectPoint(n.u, n.v, vizState.viewMode);
    return { ...n, ...proj };
  });

  const nodeMap = {};
  projectedNodes.forEach(n => nodeMap[n.id] = n);

  // 2. Draw Floor Shadows & Tethers under each Node
  if (isIso && shadowsGrp && tethersGrp) {
    projectedNodes.forEach(p => {
      const shadow = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      shadow.setAttribute('cx', p.floorX);
      shadow.setAttribute('cy', p.floorY);
      shadow.setAttribute('rx', '14');
      shadow.setAttribute('ry', '7');
      shadow.setAttribute('fill', 'rgba(0, 0, 0, 0.6)');
      shadow.setAttribute('filter', 'url(#nodeShadow)');
      shadowsGrp.appendChild(shadow);

      const tether = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      tether.setAttribute('x1', p.floorX);
      tether.setAttribute('y1', p.floorY);
      tether.setAttribute('x2', p.nodeX);
      tether.setAttribute('y2', p.nodeY);
      tether.setAttribute('stroke', 'rgba(255, 255, 255, 0.14)');
      tether.setAttribute('stroke-dasharray', '2 2');
      tether.setAttribute('stroke-width', '1.2');
      tethersGrp.appendChild(tether);
    });
  }

  // 3. Draw Network Edges (MST / Candidate / Rejected / Normal)
  if (connGrp) {
    cState.edges.forEach(e => {
      const u = nodeMap[e.u];
      const v = nodeMap[e.v];
      if (!u || !v) return;

      const isMst = e.state === 'mst';
      const isCandidate = e.state === 'candidate' || (cState.candidateEdge && cState.candidateEdge.id === e.id);
      const isRejected = e.state === 'rejected' || (cState.rejectedEdge && cState.rejectedEdge.id === e.id);

      // Edge shadow on grid floor
      if (isIso && (isMst || isCandidate)) {
        const edgeShadow = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        edgeShadow.setAttribute('x1', u.floorX);
        edgeShadow.setAttribute('y1', u.floorY);
        edgeShadow.setAttribute('x2', v.floorX);
        edgeShadow.setAttribute('y2', v.floorY);
        edgeShadow.setAttribute('stroke', isMst ? 'rgba(52, 211, 153, 0.15)' : 'rgba(0, 0, 0, 0.35)');
        edgeShadow.setAttribute('stroke-width', '3');
        connGrp.appendChild(edgeShadow);
      }

      // Edge Line in 3D floating space
      const edgeLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      edgeLine.setAttribute('x1', u.nodeX);
      edgeLine.setAttribute('y1', u.nodeY);
      edgeLine.setAttribute('x2', v.nodeX);
      edgeLine.setAttribute('y2', v.nodeY);

      let stroke = 'rgba(255, 255, 255, 0.12)';
      let strokeWidth = '1.8';
      let strokeDash = 'none';
      let filter = 'none';

      if (isMst) {
        stroke = '#34d399'; // Emerald MST
        strokeWidth = '3.5';
        filter = 'url(#glowCyan)';
      } else if (isCandidate) {
        stroke = '#38bdf8'; // Electric Cyan Candidate
        strokeWidth = '3';
        strokeDash = '6 4';
        filter = 'url(#glowCyan)';
      } else if (isRejected) {
        stroke = '#ef4444'; // Crimson Rejected Cycle
        strokeWidth = '2.8';
        strokeDash = '4 4';
      }

      edgeLine.setAttribute('stroke', stroke);
      edgeLine.setAttribute('stroke-width', strokeWidth);
      if (strokeDash !== 'none') edgeLine.setAttribute('stroke-dasharray', strokeDash);
      if (filter !== 'none') edgeLine.setAttribute('filter', filter);
      connGrp.appendChild(edgeLine);

      // Edge Weight Pill (km)
      const midX = (u.nodeX + v.nodeX) / 2;
      const midY = (u.nodeY + v.nodeY) / 2;

      const pillG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      pillG.setAttribute('transform', `translate(${midX}, ${midY})`);

      const pillRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      pillRect.setAttribute('x', '-18');
      pillRect.setAttribute('y', '-9');
      pillRect.setAttribute('width', '36');
      pillRect.setAttribute('height', '18');
      pillRect.setAttribute('rx', '3');
      pillRect.setAttribute('fill', isMst ? '#06261b' : (isRejected ? '#2b0c10' : '#0d111a'));
      pillRect.setAttribute('stroke', isMst ? '#34d399' : (isRejected ? '#ef4444' : 'rgba(255, 255, 255, 0.12)'));
      pillRect.setAttribute('stroke-width', isMst || isRejected ? '1.2' : '0.8');

      const pillText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      pillText.setAttribute('y', '4');
      pillText.setAttribute('text-anchor', 'middle');
      pillText.setAttribute('fill', isMst ? '#34d399' : (isRejected ? '#f87171' : '#94a3b8'));
      pillText.setAttribute('font-family', 'JetBrains Mono');
      pillText.setAttribute('font-size', '9');
      pillText.setAttribute('font-weight', isMst ? '700' : '500');
      pillText.textContent = `${e.w}k`;

      pillG.appendChild(pillRect);
      pillG.appendChild(pillText);
      connGrp.appendChild(pillG);

      // If rejected, show overlay badge
      if (isRejected && overlayGrp) {
        const rejG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        rejG.setAttribute('transform', `translate(${midX}, ${midY - 18})`);

        const rejRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rejRect.setAttribute('x', '-56');
        rejRect.setAttribute('y', '-10');
        rejRect.setAttribute('width', '112');
        rejRect.setAttribute('height', '20');
        rejRect.setAttribute('rx', '4');
        rejRect.setAttribute('fill', 'rgba(239, 68, 68, 0.95)');

        const rejText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        rejText.setAttribute('y', '3');
        rejText.setAttribute('text-anchor', 'middle');
        rejText.setAttribute('fill', '#ffffff');
        rejText.setAttribute('font-family', 'JetBrains Mono');
        rejText.setAttribute('font-size', '8.5');
        rejText.setAttribute('font-weight', '700');
        rejText.textContent = '✕ CHU TRÌNH (LOẠI)';

        rejG.appendChild(rejRect);
        rejG.appendChild(rejText);
        overlayGrp.appendChild(rejG);
      }
    });
  }

  // 4. Draw Floating Sphere Nodes
  projectedNodes.forEach(p => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${p.nodeX}, ${p.nodeY})`);

    // Pulsing aura on Candidate node
    if (p.state === 'candidate') {
      const pulseRing = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      pulseRing.setAttribute('r', '17');
      pulseRing.setAttribute('fill', 'none');
      pulseRing.setAttribute('stroke', '#00f0ff');
      pulseRing.setAttribute('class', 'iso-pulse-ring');
      g.appendChild(pulseRing);
    }

    // Node Sphere
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', p.type === 'hub' ? '17' : '15');

    let fill = '#111827';
    let stroke = 'rgba(255, 255, 255, 0.2)';
    let strokeWidth = '1.8';
    let filter = 'none';

    if (p.state === 'root') {
      fill = '#1e1b4b';
      stroke = '#fbbf24';
      strokeWidth = '2.8';
      filter = 'url(#glowGold)';
    } else if (p.state === 'mst') {
      fill = '#06261b';
      stroke = '#34d399';
      strokeWidth = '2.5';
      filter = 'url(#glowCyan)';
    } else if (p.state === 'candidate') {
      fill = '#0c1f2e';
      stroke = '#00f0ff';
      strokeWidth = '2.8';
      filter = 'url(#glowCyan)';
    } else if (p.type === 'hub') {
      fill = '#101726';
      stroke = '#38bdf8';
      strokeWidth = '2.2';
    }

    circle.setAttribute('fill', fill);
    circle.setAttribute('stroke', stroke);
    circle.setAttribute('stroke-width', strokeWidth);
    if (filter !== 'none') circle.setAttribute('filter', filter);
    g.appendChild(circle);

    // Node ID text
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('y', '4');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', '#ffffff');
    text.setAttribute('font-family', 'JetBrains Mono');
    text.setAttribute('font-size', '9.5');
    text.setAttribute('font-weight', '600');
    text.textContent = p.id;
    g.appendChild(text);

    // Node Station Name Label below
    const nameLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    nameLabel.setAttribute('y', '26');
    nameLabel.setAttribute('text-anchor', 'middle');
    nameLabel.setAttribute('fill', '#94a3b8');
    nameLabel.setAttribute('font-family', 'Inter');
    nameLabel.setAttribute('font-size', '9');
    nameLabel.setAttribute('font-weight', '500');
    nameLabel.textContent = p.name.replace(' DC', '').replace(' Post', '').replace(' Hub', '');
    g.appendChild(nameLabel);

    nodesGrp.appendChild(g);
  });
}

// Playback Controls
function stepForward() {
  if (vizState.stepIndex < vizState.steps.length - 1) {
    vizState.stepIndex++;
    renderCurrentStep();
  } else {
    pauseAutoPlay();
  }
}

function stepBackward() {
  if (vizState.stepIndex > 0) {
    vizState.stepIndex--;
    renderCurrentStep();
  }
}

function resetVisualizer() {
  pauseAutoPlay();
  vizState.stepIndex = 0;
  renderCurrentStep();
}

function toggleAutoPlay() {
  if (vizState.isPlaying) {
    pauseAutoPlay();
  } else {
    startAutoPlay();
  }
}

function startAutoPlay() {
  if (vizState.stepIndex >= vizState.steps.length - 1) {
    vizState.stepIndex = 0;
  }
  vizState.isPlaying = true;
  const playBtn = document.getElementById('ctrlAutoPlayBtn');
  if (playBtn) {
    playBtn.textContent = '⏸ Pause';
    playBtn.classList.add('playing');
  }

  if (vizState.autoInterval) clearInterval(vizState.autoInterval);
  vizState.autoInterval = setInterval(() => {
    if (vizState.stepIndex < vizState.steps.length - 1) {
      stepForward();
    } else {
      pauseAutoPlay();
    }
  }, vizState.speedMs);
}

function pauseAutoPlay() {
  vizState.isPlaying = false;
  if (vizState.autoInterval) {
    clearInterval(vizState.autoInterval);
    vizState.autoInterval = null;
  }
  const playBtn = document.getElementById('ctrlAutoPlayBtn');
  if (playBtn) {
    playBtn.textContent = '▶ Auto Play';
    playBtn.classList.remove('playing');
  }
}

// Setup Event Listeners for Controls
function setupExecutionControls() {
  const prevBtn = document.getElementById('ctrlPrevStepBtn');
  const nextBtn = document.getElementById('ctrlNextStepBtn');
  const playBtn = document.getElementById('ctrlAutoPlayBtn');
  const resetBtn = document.getElementById('ctrlResetBtn');
  const randomBtn = document.getElementById('ctrlRandomBtn');
  const scrubber = document.getElementById('stepScrubber');
  const speedSlider = document.getElementById('speedSlider');
  const speedLabel = document.getElementById('speedLabel');

  if (prevBtn) prevBtn.addEventListener('click', stepBackward);
  if (nextBtn) nextBtn.addEventListener('click', stepForward);
  if (playBtn) playBtn.addEventListener('click', toggleAutoPlay);
  if (resetBtn) resetBtn.addEventListener('click', resetVisualizer);

  if (randomBtn) {
    // Reset to step 0
    randomBtn.addEventListener('click', () => {
      switchAlgorithm(vizState.currentAlgo);
    });
  }

  if (scrubber) {
    scrubber.addEventListener('input', (e) => {
      pauseAutoPlay();
      vizState.stepIndex = parseInt(e.target.value, 10);
      renderCurrentStep();
    });
  }

  if (speedSlider) {
    speedSlider.addEventListener('input', (e) => {
      vizState.speedMs = parseInt(e.target.value, 10);
      if (speedLabel) {
        const factor = (1000 / vizState.speedMs).toFixed(1);
        speedLabel.textContent = `${factor}x (${vizState.speedMs}ms)`;
      }
      if (vizState.isPlaying) {
        startAutoPlay();
      }
    });
  }

  // Keyboard navigation for Slide 9
  window.addEventListener('keydown', (e) => {
    const slide9 = document.getElementById('slide-9');
    if (!slide9 || !slide9.classList.contains('active')) return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === '[' || e.key === ',') {
      e.preventDefault();
      stepBackward();
    } else if (e.key === ']' || e.key === '.') {
      e.preventDefault();
      stepForward();
    } else if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      resetVisualizer();
    }
  });
}

// Setup Algo Tabs (Kruskal, Prim, Borůvka)
function setupAlgoTabs() {
  const tabs = document.querySelectorAll('.algo-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const algo = tab.dataset.algo;
      if (algo) switchAlgorithm(algo);
    });
  });
}

// Setup View Actions (Isometric vs 2D, Split vs Stacked, Theater)
function setupViewControls() {
  const isoBtn = document.getElementById('btnToggleIsoView');
  const isoBtnText = document.getElementById('isoBtnText');
  const layoutBtn = document.getElementById('btnToggleLayout');
  const layoutBtnText = document.getElementById('layoutBtnText');
  const theaterBtn = document.getElementById('btnTheaterMode');
  const maxDot = document.getElementById('macosDotMaximize');
  const studioLayout = document.getElementById('algoStudioLayout');

  if (isoBtn) {
    isoBtn.addEventListener('click', () => {
      vizState.viewMode = vizState.viewMode === 'iso' ? '2d' : 'iso';
      if (isoBtnText) {
        isoBtnText.textContent = vizState.viewMode === 'iso' ? '2.5D Isometric' : '2D Top-Down';
      }
      isoBtn.classList.toggle('active', vizState.viewMode === 'iso');
      renderCurrentStep();
    });
  }

  if (layoutBtn && studioLayout) {
    layoutBtn.addEventListener('click', () => {
      vizState.layoutMode = vizState.layoutMode === 'split' ? 'stacked' : 'split';
      studioLayout.classList.toggle('stacked', vizState.layoutMode === 'stacked');
      if (layoutBtnText) {
        layoutBtnText.textContent = vizState.layoutMode === 'split' ? 'Split View' : 'Stacked View';
      }
      layoutBtn.classList.toggle('active', vizState.layoutMode === 'stacked');
    });
  }

  function toggleTheater() {
    if (!studioLayout) return;
    vizState.theaterMode = !vizState.theaterMode;
    studioLayout.classList.toggle('theater-active', vizState.theaterMode);
    if (theaterBtn) theaterBtn.classList.toggle('active', vizState.theaterMode);
  }

  if (theaterBtn) theaterBtn.addEventListener('click', toggleTheater);
  if (maxDot) maxDot.addEventListener('click', toggleTheater);
}

// Global API
window.initSimulator = initAlgorithmVisualizer;
window.initAlgorithmVisualizer = initAlgorithmVisualizer;
window.switchAlgorithmVisualizer = switchAlgorithm;
window.toggleAutoPlayVisualizer = toggleAutoPlay;
window.jumpToVisualizer = function(algoId) {
  if (typeof goToSlide === 'function') {
    goToSlide(9);
  }
  setTimeout(() => {
    switchAlgorithm(algoId);
  }, 50);
};
