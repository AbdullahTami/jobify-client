import styled from "styled-components";

const ElLoader = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 6rem);
  justify-content: center;
  align-items: center;
`;

function Loader() {
  return (
    <ElLoader>
      <div className="loading"></div>;
    </ElLoader>
  );
}

export default Loader;
