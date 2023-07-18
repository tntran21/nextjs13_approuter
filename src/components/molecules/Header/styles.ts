import styled from "@emotion/styled";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 4rem;
  background-color: #fff;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(1.5px);
  -webkit-backdrop-filter: blur(1.5px);

  .nav {
    &-item {
      &:hover {
        opacity: 0.7;
      }
    }
  }
`;

export { StyledHeader };
