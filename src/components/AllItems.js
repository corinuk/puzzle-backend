import Item from "components/Item";
import { dbService } from "fb";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

function AllItems() {
  const [foods, setFoods] = useState([]);
  const getFoods = async () => {
    const q = query(collection(dbService, "foods"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const foodObj = {
        ...doc.data(),
        id: doc.id,
      };

      setFoods((prev) =>
        [foodObj, ...prev].sort(function (a, b) {
          return b.createdAt - a.createdAt;
        })
      );
    });
  };

  useEffect(() => {
    setFoods([]);
    getFoods();
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      {foods.map(({ id, menu, place, address, price, saledPrice }) => (
        <Item
          id={id}
          key={id}
          menu={menu}
          place={place}
          address={address}
          prevPrice={Number(price)}
          saledPrice={Number(saledPrice)}
        />
      ))}
    </div>
  );
}

export default AllItems;
