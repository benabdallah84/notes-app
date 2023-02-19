import React from "react";
import PropTypes from "prop-types";

class Title extends React.Component{
    render(){
        return(
            <h1>This is the first Lesson in React and {this.props.content}</h1>
        )
    }
}
export default Title;

Title.propTypes = {
    content: PropTypes.string
}