import React, {Component} from 'react'
import {Tag,Alert,Row,Col, Button} from 'antd'

export default class FilterBar extends Component {

    handleClose = (key) => {
        this.props.onRemove(key)
    }

    render() {
        const {filters = {}, dataSource = []} = this.props

        const columnInfo = dataSource.reduce((memo, info) => {
            memo[info.dataIndex] = info
            return memo
        }, {})

        const keys = Object.keys(filters)
        if (keys.length) {
            let tags = keys.map(key => {
                const {title, filters: filterOptions, filterDropdownType } = columnInfo[key]
                const name = title
                let value = filters[key]
                if (filterOptions) {
                    value = filterOptions.filter(c => value.indexOf(c.value) > -1).map(c => c.text)
                }
                if (filterDropdownType === 'number' || filterDropdownType === 'date') {
                    value = value.join(' ~ ')
                }
                return (
                    <Tag key={key} closable color="blue" onClose={_ => this.handleClose(key)}>
                        {name}: {`${value}`}
                    </Tag>
                )
            })
            const message = (
                <Row>
                    <Col span={22}>{tags}</Col>
                    <Col span={2}><Button onClick={this.props.onReset} size="small" type="dashed" >重置</Button></Col>
                </Row>
            )
            return <Alert message={message} type="info" />
        } 
        return null
    }

}