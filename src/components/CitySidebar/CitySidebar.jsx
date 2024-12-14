// import React from "react";
import { useEffect } from "react";
import "./CitySidebar.css";

const CitySidebar = () => {
  //handle button click
  // load from localstore

  useEffect(() => {
    let cities = JSON.parse(localStorage.getItem("cities")) || [];
    let citylist = document.querySelector(".citylist");
    cities.forEach((city) => {
      let citydiv = document.createElement("div");
      citydiv.innerHTML = city;
      citylist.appendChild(citydiv);
    });
    document.getElementById("addbutton").addEventListener("click", function () {
      let cityinput = document.getElementById("cityinput");
      let city = cityinput.value;
      cities.push(city);
      localStorage.setItem("cities", JSON.stringify(cities));
      let citydiv = document.createElement("div");
      citydiv.innerHTML = city;
      citylist.appendChild(citydiv);
      cityinput.value = "";
      // citydiv on click, set search-bar input value to city
      citydiv.addEventListener("click", function () {
        document.getElementById("search-bar").value = city;
      });
    });
    document
      .getElementById("clearbutton")
      .addEventListener("click", function () {
        localStorage.removeItem("cities");
        citylist.innerHTML = "";
      });
  });

  return (
    <>
      {/* allow users to add favourite cities */}
      <div id="citysidebar">
        <div className="bigheader">Favourites</div>
        <div className="smallheader">Add a city to your favs:</div>
        <br />
        <input type="text" id="cityinput" placeholder="City name"></input>
        <button id="addbutton">Add</button>
        <br />
        <br />
        <div className="smallheader">Your favourite cities:</div>
        {/* clear list button */}
        <div className="clrbutton">
          <button id="clearbutton">Clear list</button>
        </div>
        <br />
        <div className="citylist"></div>
      </div>
    </>
  );
};

export default CitySidebar;
