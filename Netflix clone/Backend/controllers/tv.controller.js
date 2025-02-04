import { fetchfromtmdb } from "../services/tmdb.service.js";

export const getTrendingTv = async (req, res) => {
  try {
    const data = await fetchfromtmdb(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    console.log("error in getTrendingMovies", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getTvTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchfromtmdb(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    console.log(data);
    res.status(200).json({ success: true, trailers: data.results });
  } catch (err) {
    if (err.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, error: "internal server error" });
  }
};

export const getTvDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchfromtmdb(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    res.status(200).json({ success: true, content: data });
  } catch (err) {
    if (err.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, error: "internal server error" });
  }
};

export const getSimilarTvs = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchfromtmdb(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (err) {
    res.status(500).json({ success: false, error: "internal server error" });
  }
};

export const getTvsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const data = await fetchfromtmdb(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US`
    );
    if (data.results.length === 0) {
      return res.status(404).send(null);
    }
    res.status(200).json({ success: true, content: data.results });
  } catch (err) {
    res.status(500).json({ success: false, error: "internal server error" });
  }
};
