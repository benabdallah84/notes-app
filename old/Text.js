import React from 'react';
import Styled from 'styled-components'
function Text(props){
    const {addition="courses",children } = props;
    const Container = Styled.div`
    color: blue;
  `;
    return(
        <>
        <h2>Basics and {addition}</h2>
        <Container>{children}</Container>
        </>
    )
}
export default Text;