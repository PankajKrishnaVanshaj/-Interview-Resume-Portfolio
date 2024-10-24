"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [allImage, setAllImage] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImage = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/upload");
      const data = await response.data;
      setAllImage(data?.files);
      setError(null);
    } catch (err) {
      setError("Failed to fetch images.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (name) => {
    setLoading(true);
    try {
      const response = await axios.delete("/api/upload", {
        params: {
          image: name,
        },
      });
      const data = await response.data;
      fetchImage();
      setError(null);
      console.log({ data });
    } catch (err) {
      setError("Failed to delete image.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    try {
      const response = await axios.post("/api/upload", formData);
      const data = await response.data;
      fetchImage();
      setError(null);
      console.log({ data });
    } catch (err) {
      setError("Failed to upload image.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-5">
      <form
        onSubmit={onSubmitHandler}
        className="w-1/2 mx-auto flex flex-col gap-5"
      >
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          name=""
          id=""
        />
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="px-12 py-3 rounded text-white bg-red-500"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>

      {error && <div className="text-red-500">{error}</div>}

      {loading && !allImage.length ? (
        <div>Loading images...</div>
      ) : (
        <div className="w-full flex flex-wrap">
          {allImage &&
            allImage.length > 0 &&
            allImage.map((cur, i) => {
              return (
                <div
                  key={i}
                  className="w-1/3 mx-auto p-4 border border-purple-500 ring-2"
                >
                  <img src={`./images/${cur}`} alt={`image${i}`} />
                  <button
                    onClick={() => deleteImage(cur)}
                    className="px-5 py-2 bg-black text-white rounded mr-auto my-2"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      )}
    </main>
  );
}
