import User from "../models/user.model";

export const searchMovies = async (req, res) => {
  try {
    const query = req.params.query;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    const data = await response.json();
    if (data.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: data.results[0].id,
            name: data.results[0].profile_path,
            title:data.results[0].name,
            searchType: "movie",
            createdAt: new Date(),
          },
        },
      });
    res.status(200).json({ success: true, data: data.results });
  } catch (err) {
    console.log("error in searchPerson controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchPerson = async (req, res) => {
  try {
    const query = req.params.query;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );
    const data = await response.json();
    if (data.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          name: data.results[0].profile_path,
          title:data.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ success: true, data: data.results });
  } catch (err) {
    console.log("error in searchPerson controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchTv = async (req, res) => {
  try {
    const query = req.params.query;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );
    const data = await response.json();
    if (data.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: data.results[0].id,
            name: data.results[0].profile_path,
            title:data.results[0].name,
            searchType: "tvShow",
            createdAt: new Date(),
          },
        },
      });
    res.status(200).json({ success: true, data: data.results });
  } catch (err) {
    console.log("error in searchPerson controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
