import React, {Component} from 'react';
import {render}  from 'react-dom';

import { Dropdown,Input} from 'antd';
// const MenuItem = Menu.Item;
import Menu ,{MenuItem} from 'rc-menu';
import KeyCode from 'rc-util/lib/KeyCode';
import './styles/index'

//props selectKey 指定一个key的值填入input中
class MultiColSelect extends Component {
    constructor(props) {
        super(props)

        this.state = {
            val:"",
            optionList: {},
            open:false,
            selectKeys:['-1'],
            activeKeys:'-1',
        }
    }

    static defaultProps ={
        selectKey:"value",
        disabled:false
    }

    setOpenState=(visible)=>{
        this.setState({
            open:visible
        })
    }

    onKeyDown=(event) =>{
        const props = this.props;
        if (props.disabled) {
            return;
        }
        const keyCode = event.keyCode;
        if (this.state.open && !this.getInputDOMNode()) {
            this.onInputKeyDown(event);
        } else if (props.type != "textarea" && keyCode === KeyCode.ENTER || keyCode === KeyCode.DOWN) {
            this.setOpenState(true);
            event.preventDefault();
        }
    }

    getInputDOMNode=()=> {
        return this.inputInstance;
    }

    onInputKeyDown=(event)=> {
        const props = this.props;
        if (props.disabled) {
            return;
        }
        const state = this.state;
        const keyCode = event.keyCode;


        if (keyCode === KeyCode.DOWN || keyCode === KeyCode.UP) {
            if (!state.open && keyCode === KeyCode.DOWN) {
                this.openIfHasChildren();
                event.preventDefault();
                event.stopPropagation();
                return;
            }else{
                var _length = this.props.dataBody.length - 1;
                var currentKey = +this.state.activeKey || _length;

                console.log(+this.state.activeKey ,_length,currentKey == _length)
                if(keyCode === KeyCode.DOWN){
                    if(currentKey == _length ){
                        currentKey = 0;
                    }else {
                        currentKey += 1;
                    }
                }else{
                    if(currentKey == 0){
                        currentKey = _length ;
                    }else {
                        currentKey -= 1
                    }
                }

                this.setState({
                    activeKey:String(currentKey)
                })
            }
        } else if (keyCode === KeyCode.ESC) {
            if (state.open) {
                this.setOpenState(false);
                event.preventDefault();
                event.stopPropagation();
            }
            return;
        }else if (keyCode === KeyCode.ENTER){
            let _key = this.props.selectKey;
            let _obj = this.props.dataBody;
            let currentKey = this.state.activeKey;
            this.setState({
                open:false,
                selectKeys:[String(currentKey)]
            })
            this.props.onChange(_obj[currentKey][_key])
            this.props.onSelect && this.props.onSelect(_obj[_key]);
            event.preventDefault();
            event.stopPropagation();
        }
    }

    openIfHasChildren =()=> {
        const props = this.props;
        if (React.Children.count(props.children) || isSingleMode(props)) {
            this.setOpenState(true);
        }
    }

    handleChange=(e)=>{
        this.props.onChange(e.target.value)
    }

    handleSelect =(value) =>{
        let _key = this.props.selectKey;
        let _obj = this.props.dataBody[value.key]
        let currentKey = _obj[_key]
        this.setState({
            open:false,
            activeKey:String(value.key),
            selectKeys:[String(value.key)]
        })
        this.props.onChange(currentKey)
        this.props.onSelect && this.props.onSelect(_obj);
}

    render() {
        const {dataHeader,dataBody,type,rows,autosize,...props} = this.props;
        const dropdownHeadData = dataHeader,
            dropdownBodyData = dataBody || "not found";
        // 拼接下拉框header部分结构
        const dropdownHeadElement = dropdownHeadData && dropdownHeadData.map(val => <p key={val.dataIndex}>{val.title}</p>);
        const dropdownBodyElement = typeof dropdownBodyData ==="string" ? <MenuItem className="no-data" disabled><p colSpan="2">{dropdownBodyData}</p><p></p></MenuItem> : bodyElement();
        //下拉框body部分
        function bodyElement() {
            return dropdownBodyData.map(function (val,index) {
                const parentVal = val;
                const  _item = dropdownHeadData.map((val,i)=> <p key={i}>{parentVal[val.dataIndex]}</p>);
                return <MenuItem key={index}>{_item}</MenuItem>//这里的key可以当value使用，不用再定义value
            })
        }


        return (
            <Dropdown overlay={
                <Menu
                    onSelect={this.handleSelect}
                    className="o-dropdown-multi-col"
                    activeKey ={this.state.activeKey}
                    selectedKeys={this.state.selectKeys}
                >
                    <MenuItem key="title" disabled>{dropdownHeadElement}</MenuItem>
                    {dropdownBodyElement}
                </Menu>
            }
                      onClick ={()=>this.setOpenState(true)}
                      onBlur ={()=>this.setOpenState(false)}
                      visible={this.state.open}
            >

                <Input
                    ref="input"
                    type={type}
                    value={props.value}
                    rows={rows}
                    autosize={autosize}
                    onChange={this.handleChange}
                    onKeyDown={this.onKeyDown}
                />
            </Dropdown>
        );
    }
}

export default MultiColSelect;