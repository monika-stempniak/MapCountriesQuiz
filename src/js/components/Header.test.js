import React from "react";
import { shallow } from "enzyme";
import Header from "./Header";

describe("<Header />", () => {
  const wrapper = shallow(<Header section="map">Map Quiz</Header>);
  it("should contain header element with .map-header class", () => {
    expect(wrapper.find("header")).toHaveLength(1);
    expect(wrapper.find("header").hasClass("map-header")).toBeTruthy();
  });
  it("should contain h1 element with .header-title class and correct text", () => {
    expect(wrapper.find("h1").exists()).toBe(true);
    expect(wrapper.find(".header-title").text()).toBe("Map Quiz");
  });
  it("should render a header title", () => {
    expect(wrapper.prop("children")).toEqual(
      <h1 className="header-title">Map Quiz</h1>
    );
  });
  it("matches the snapchot", () => {
    const tree = shallow(<Header />);
    expect(tree).toMatchSnapshot();
  });
});
