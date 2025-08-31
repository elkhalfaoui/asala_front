"use client";

import { Provider } from "react-redux";
import { store } from "../_store/store";
import Header from "../_components/header";
import Footer from "../_components/footer";

const App = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Provider store={store}>
      <Header />
      {children}
      <Footer />
    </Provider>
  );
};

export default App;
