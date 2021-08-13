import styled from "styled-components";

const StyledWrapper = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    background-color: #bfccab;
`;

export const Layout: React.FC = ({ children }) => {
    return <StyledWrapper>{children}</StyledWrapper>;
};
