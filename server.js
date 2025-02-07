const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/download", async (req, res) => {
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        const postId = url.split('/')[4];  

        const response = await axios.get(`https://instagram230.p.rapidapi.com/post/comments?pk=${postId}`, {
            headers: {
                "x-rapidapi-key": process.env.46941062cdmshdb4ff8711fa424bp16077fjsn1ef5ef78ed28,
                "x-rapidapi-host": "instagram230.p.rapidapi.com"
            }
        });

        const media = response.data.data[0]; 
        const mediaUrl = media.image_url || media.video_url;

        if (mediaUrl) {
            return res.json({ mediaUrl });
        } else {
            return res.status(404).json({ error: "No media found" });
        }
    } catch (error) {
        console.error("Error fetching media:", error);
        return res.status(500).json({ error: "Failed to fetch media" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
