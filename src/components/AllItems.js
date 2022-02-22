import Item from "components/Item";
import { dbService, storageService } from "fb";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  deleteDoc,
  getDocs,
  limit,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useState } from "react";

function AllItems() {
  const [foods, setFoods] = useState([]);

  const deleteFood = async () => {
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
    let order_createdAt = [];
    let food_createdAt = [];
    const ordersCol = collection(dbService, "orders");
    const foodsCol = collection(dbService, "foods");
    const orderDocRef = query(
      ordersCol,
      orderBy("createdAt_order", "desc"),
      limit(3)
    );
    const foodDocRef = query(foodsCol);
    const orderSnapshots = await getDocs(orderDocRef);
    orderSnapshots.forEach((doc) => {
      const obj = {
        id_order: doc.id,
        id: doc.data().id,
        createdAt: doc.data().createdAt,
      };
      order_createdAt.push(obj);
    });
    const foodSnapshots = await getDocs(foodDocRef);
    foodSnapshots.forEach((doc) => {
      const obj = { id: doc.id, createdAt: doc.data().createdAt };
      food_createdAt.push(obj);
    });
    let intersection;
    intersection = order_createdAt.filter((element) =>
      food_createdAt.map((e) => e.createdAt === element.createdAt)
    );
    intersection.map(async ({ createdAt, id, id_order }) => {
      const fileRef = ref(storageService, `/images/${createdAt}`);

      const q = query(doc(dbService, "foods", `${id}`));
      const q2 = query(doc(dbService, "orders", `${id_order}`));
      await deleteObject(fileRef);
      await deleteDoc(q);
      await deleteDoc(q2);
      window.location.reload();
    });
  };

  useEffect(() => {
    setFoods([]);
    onSnapshot(query(collection(dbService, "orders")), (snapshot) => {
      deleteFood();
    });
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      {foods.map(
        ({
          id,
          menu,
          place,
          address,
          price,
          saledPrice,
          deadlineHours,
          deadlineMinutes,
          fileURL,
          createdAt,
        }) => (
          <Item
            id={id}
            key={id}
            menu={menu}
            place={place}
            address={address}
            prevPrice={Number(price)}
            saledPrice={Number(saledPrice)}
            deadlineHours={deadlineHours}
            deadlineMinutes={deadlineMinutes}
            fileURL={fileURL}
            createdAt={createdAt}
          />
        )
      )}
    </div>
  );
}

export default AllItems;
