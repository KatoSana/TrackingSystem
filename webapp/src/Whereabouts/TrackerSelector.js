import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default function TrackerSelector(props) {
  const [items, setItems] = useState({});

  if (!items.length) {
    fetch(`${process.env.REACT_APP_API_URL}/api/tracker`)
      .then(res => res.json())
      .then(json => {
        const items = json.map(item => {
          return { name: item.trackerName, ID: item.trackerID, checked: false };
        });
        setItems(items);
      });
  }

  const itemSelect = event => {
    const index = items.findIndex(item => {
      return item.ID === event.target.value;
    });
    const items_copy = items.slice();
    items_copy[index].checked = !items_copy[index].checked;
    setItems(items_copy);
    props.onChange(
      items.filter(item => {
        return item.checked === true;
      })
    );
  };

  const menu = [];
  if (items.length) {
    items.forEach(item => {
      menu.push(
        <div key={item.ID}>
          <Checkbox type="checkbox" value={item.ID} onChange={itemSelect} color="primary" />
          {item.name}
        </div>
      );
    });
  }
  return <div>{menu}</div>;
}
