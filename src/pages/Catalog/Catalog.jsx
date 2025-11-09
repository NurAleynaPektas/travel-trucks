import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCampers,
  selectCampers,
  selectCampersLoading,
  selectCampersHasMore,
  selectCampersPage,
} from "../../store/campersSlice";
import Loader from "../../components/Loader/Loader";
import CamperCard from "../../components/CamperCard/CamperCard";
import FiltersPanel from "../../components/FiltersPanel/FiltersPanel";
import s from "./Catalog.module.css";

export default function Catalog() {
  const dispatch = useDispatch();

  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectCampersLoading);
  const hasMore = useSelector(selectCampersHasMore);
  const page = useSelector(selectCampersPage);

  useEffect(() => {
    dispatch(fetchCampers({ page: 1, limit: 4 }));
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchCampers({ page: page + 1, limit: 4 }));
  };

  return (
    <section className={s.catalog}>
      {isLoading && <Loader />}

      <h1 className={s.title}>Our campers</h1>

      <div className={s.layout}>

        <div className={s.list}>
          {Array.isArray(campers) &&
            campers.map((camper) => (
              <CamperCard key={camper.id} camper={camper} />
            ))}

          {hasMore &&
            !isLoading &&
            Array.isArray(campers) &&
            campers.length > 0 && (
              <button className={s.loadMore} onClick={handleLoadMore}>
                Load more
              </button>
            )}
        </div>

     
        <aside className={s.filters}>
          <FiltersPanel />
        </aside>
      </div>
    </section>
  );
}
