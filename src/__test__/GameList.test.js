import React from "react";
import { mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import GameList from "../components/GameList/GameList";
import { render } from "@testing-library/react";

describe("<GameList />", () => {
  const mockStore = configureMockStore();

  let store = mockStore({
    counter: {
      number: 0
    }
  });

  it('renders properly', () => {
    const context = { store };
    component = mount(<GameList />, { context });
    // 혹은 component = mount(<CounterContainer store={store} />);
  });

  // it("matches snapshot", () => {
  //   const utils = render(<GameList />);
  //   expect(utils.container).toMatchSnapshot();
  // });
  // it("shows the props correctly", () => {
  //   const utils = render(<GameList username="velopert" name="김민준" />);
  //   utils.getByText("velopert"); // velopert 라는 텍스트를 가진 엘리먼트가 있는지 확인
  //   utils.getByText("(김민준)"); // (김민준) 이라는 텍스트를 가진 엘리먼트가 있는지 확인
  //   utils.getByText(/김/); // 정규식 /김/ 을 통과하는 엘리먼트가 있는지 확인
  // });
});
