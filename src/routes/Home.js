import { dbService } from "fbase";
import React, { useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      //promise를 리턴하면 async -await 해줘야됨
      nweet,
      createdAt: Date.now(),
    });
    setNweet(""); // submit 하고 초기화 하기
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          type="text"
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
        {/* 클릭할때마다 어딘가로 submit하고 있음(새고) */}
      </form>
    </div>
  );
};
export default Home;
