import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    const dbNweets = await dbService.collection("nweets").get(); // async를 써야되기 때문에 개별적인 함수여야됨
    // querySnapshot을 리턴함
    dbNweets.forEach((document) => {
      //console.log(document.data()));
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [nweetObject, ...prev]); // 모든 이전 nweets에 대해, 배열을 리턴함(새로 작성한 트윗, 그 이전 트윗들)
      // set이 붙는 함수를 쓸 때 값 대신 함수를 전달할 수 있음
    });
  };
  useEffect(() => {
    getNweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      // promise를 리턴하면 async -await 해줘야됨
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
  console.log(nweets);
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
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
