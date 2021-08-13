import styled from "styled-components";

const StyledWrapper = styled.div`
    background-color: #78acda;
    padding: 16px 64px;
`;

type TestProps = {
    title: string;
    obj: object;
};

export const Test: React.FC<TestProps> = ({ title, obj }) => {
    return (
        <StyledWrapper>
            {title} {JSON.stringify(obj)}
        </StyledWrapper>
    );
};
