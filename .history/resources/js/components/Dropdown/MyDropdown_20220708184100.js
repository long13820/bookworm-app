import React from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, List } from 'reactstrap';

class MyDropdown extends React.Component{

    constructor(props){
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state ={
            dropdownOpen:false,
            title: this.props.title
        }
    }
    toggle(){
        this.setState((prevState) => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    changeTitle(title){
        this.setState(() => ({
            title:title
        }))
    }
 render(){
    const {list  , handShow , han} = this.props;
    return (

        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>{this.state.title}</DropdownToggle>
            <DropdownMenu container="body">
                {list.map((item,idx) => {
                    return (
                        <DropdownItem  key={idx} onClick={() => handShow(item)} >
                            {item}
                        </DropdownItem>
                    )
                })}
            </DropdownMenu>
        </Dropdown>
    )
 }
}

export default MyDropdown;
