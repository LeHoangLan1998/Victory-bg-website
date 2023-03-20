import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import classes from "./Item.module.css";

const Item = (props) => {
  const navigate = useNavigate();
  const [data, setdata] = useState({});
  useEffect(() => {
    props.data ? setdata(props.data) : null;
  }, []);

  //Popover config
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{data.title}</Popover.Header>
      <Popover.Body>
        <ul>
          <li>Материя: {data.material}</li>
          <li>Цвят: {data.color}</li>
          <li>Дължина: {data.length}</li>
          <li>Цена: {data.price}</li>
          <li>Размери: {data.size}</li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger placement="auto" overlay={popover}>
      <div
        className={classes.item}
        onClick={() => navigate(`/item/${data.id}`)}
      >
        <img
          src={`\\src\\assets\\products\\${data.imageRef}`}
          style={{ width: "100%" }}
        />

        <div className={classes["item-label"]}>
          <div>{data.productName}</div>
          <span style={{ marginLeft: "auto" }}>{data.price} лв.</span>
        </div>
      </div>
    </OverlayTrigger>
  );
};

export default Item;
