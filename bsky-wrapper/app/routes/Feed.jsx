import Header from "../components/center/Header";
import Post from "../components/center/Post";
import { useOutletContext } from "@remix-run/react";
import { useState, useEffect } from "react";

const Feed = () => {

    const [localData, apiInterface, server, setServer] = useOutletContext();
    const [posts, setPosts] = useState({feed: []});

    useEffect(() => {

        const getPosts = async () => {

            setPosts(await apiInterface.getFeed());
        }

        getPosts();
    }, []);

    var index = 0;

    return (
        <div className={"Feed"}>
            <Header title="Feed" />
            {posts.feed.map((record) => (apiInterface.isHiddenHydrated(record.post.author) == false) && <Post record={record} key={record.post.uri + "/target/" + index++} />)}
        </div>
    )
}

export default Feed;