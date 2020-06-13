import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from '../axiosWithAuth';
import { useRouteMatch, useHistory } from 'react-router-dom';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const match = useRouteMatch();
  const history = useHistory();
  console.log("ml: colorlist: ", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: "",
    code: { hex: "" }
  });

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    console.log('ml: colorlist: saveEdit', colorToEdit)
    axiosWithAuth()
        .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
        .then(res => {
            console.log('ml: colorlist: saveEdit: res in put', res)
            console.log('ml: colorlist: saveEdit: res.data', res.data);
            axiosWithAuth().get('http://localhost:5000/api/colors')
                .then(res => {
                   updateColors(res.data)
                })
                .catch(err => console.log('ml: colorlist: saveEdit: err ', err))
                console.log('ml: colorlist: saveEdit: err payload: ', res.data.payload);
            history.push(`/`)

        })
        .catch(err => {
            console.log('ml: colorlist: saveEdit: err inside catch', err);
        })
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`, color)
      .then(res => {
        console.log('ml: colorlist: deleteColor: res inside delete', res);
        console.log('ml: colorlist: deleteColor: res.data', res.data);
        axiosWithAuth().get('http://localhost:5000/api/colors')
          .then(res => {
            updateColors(res.data)
          })
          .catch(err => console.log('ml: colorlist: deleteColor: catch err', err))
          console.log('ml: colorlist: deleteColor: catch payload: ', res.data.payload);
          history.push(`/`)
      })
      .catch(err => {
        console.log('ml: colorlist: deleteColor: err inside catch: ', err);
      })
  };

  const addColor = (e) => {
    e.preventDefault();
    console.log('ml: colorlist: addColor: ', newColor)
    axiosWithAuth()
      .post('http://localhost:5000/api/colors', newColor)
      .then(res => {
        axiosWithAuth().get('http://localhost:5000/api/colors')
          .then(res => {
            updateColors(res.data)
          })
          .catch(err => console.log('ml: colorlist: addColor: post err: ', err))
        console.log('ml: colorlist: addColor: postpayload: ', res.data.payload);
      })
      .catch(err => {
        console.log('ml: colorlist: addColor: catch err: ', err);
      })
  };

  const handleChange = (e) => {
    setNewColor({ ...newColor, [e.target.name]: e.target.value })
  }

  const handleHexChange = (e) => {
    setNewColor({...newColor, code: {hex: e.target.value}})
  }

  return (
    <div className="colors-wrap">
      <div className="color-list">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      </div>
      <div className="spacer" />
      <div className="color-add">
      <form onSubmit={(e) => addColor(e)}>
        <p>Add Colors</p>
        <p>Color:</p>
        <input
          type='text'
          name='color'
          onChange={(e) => handleChange(e)}
        />
        <p>Hex:</p>
        <input
          type='text'
          name='hex'
          onChange={(e) => handleHexChange(e)}
        />

        <p></p>
        <button>Add Color</button>
      </form>
      </div>
    </div>
  );
};

export default ColorList;
