import React from "react";
import * as S from "./Spinner.Style";

const Spinner = ({ message = "Loading content..." }) => {
  return (
    <S.SpinnerWrapper>
      <S.Loader />
      {message && <S.LoadingText>{message}</S.LoadingText>}
    </S.SpinnerWrapper>
  );
};

export default Spinner;
