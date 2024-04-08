import React, { useState, useEffect } from "react";
import fetchImages from "../helper/database";


interface Image {
  id: string;
  url: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (!loading && hasMore) {
      setLoading(true);
      const newImages = await fetchImages(page);
      setImages(newImages);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
      if (newImages.length === 0) {
        setHasMore(false);
      }
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    },
    { threshold: 1.0 }
  );

  useEffect(() => {
    const gallery = document.getElementById("gallery");
    if (gallery) {
      observer.observe(gallery);
    }
    return () => {
      if (gallery) {
        observer.unobserve(gallery);
      }
    };
  }, []);

  return (
    <div id="gallery" style={{ height: "100vh", overflow: "auto" }}>
      <div style={{ display: "flex", flexWrap: "wrap", margin: "-10px" }}>
        {images?.map((image) => (
          <div key={image.id} style={{ width: "25%", padding: "10px" }}>
            <img src={image.url} alt="" style={{ width: "100%", height: "auto" }} />
          </div>
        ))}
      </div>
      {loading && <div>Loading...</div>}
      {!loading && hasMore && <div style={{ height: "100px" }} />}
    </div>
  );
};

export default Gallery;
