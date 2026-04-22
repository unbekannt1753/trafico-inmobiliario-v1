const App = () => {
  const [route, setRoute] = useState("home");
  const [params, setParams] = useState({});
  const [favs, setFavs] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem("traf-favs") || "[\"rmn-214\",\"tlm-019\"]")); } catch { return new Set(); }
  });
  const [tweaks, setTweaks] = useState(() => ({ ...window.__TWEAKS__ }));
  const [editMode, setEditMode] = useState(false);

  useEffect(() => { /* route not persisted — start at home on refresh */ }, [route]);
  useEffect(() => { /* params not persisted */ }, [params]);
  useEffect(() => { localStorage.setItem("traf-favs", JSON.stringify([...favs])); }, [favs]);

  useEffect(() => {
    const h = document.documentElement;
    h.dataset.theme = tweaks.theme;
    h.dataset.density = tweaks.density;
    h.dataset.card = tweaks.cardStyle;
    h.dataset.serif = tweaks.serifDisplay ? "true" : "false";
  }, [tweaks]);

  // Tweaks bridge
  useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === "__activate_edit_mode") setEditMode(true);
      if (e.data?.type === "__deactivate_edit_mode") setEditMode(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const setTweak = (k, v) => {
    setTweaks(t => {
      const n = { ...t, [k]: v };
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
      return n;
    });
  };

  const goto = (r, p = null) => {
    setRoute(r);
    setParams(p || {});
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const toggleFav = (id) => {
    setFavs(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  let page;
  if (route === "home") page = <Home goto={goto} favs={favs} toggleFav={toggleFav}/>;
  else if (route === "search") page = <Search goto={goto} favs={favs} toggleFav={toggleFav} params={params}/>;
  else if (route === "detail") page = <Detail goto={goto} favs={favs} toggleFav={toggleFav} params={params}/>;
  else if (route === "publish") page = <Publish goto={goto}/>;
  else if (route === "favorites") page = <Favorites goto={goto} favs={favs} toggleFav={toggleFav}/>;
  else if (route === "signin") page = <SignIn goto={goto}/>;
  else if (route === "crm") page = <CRM goto={goto}/>;
  else if (route === "agent-crm") page = <AgentCRM goto={goto}/>;
  else page = <Home goto={goto} favs={favs} toggleFav={toggleFav}/>;

  const hideChrome = route === "signin" || route === "crm" || route === "agent-crm";
  return (
    <div>
      {!hideChrome && <Nav route={route} goto={goto} favCount={favs.size}/>}
      {page}
      {!hideChrome && route !== "search" && <Footer/>}
      <Tweaks tweaks={tweaks} setTweak={setTweak} visible={editMode}/>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
