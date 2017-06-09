/**
 * Created by Administrator on 2016/11/1 0001.
 */
import 'ibos/styles/framework.less';
import React, {Component} from 'react'

import {Panel, FormLayout, Steps, SplitContainer, Split} from 'ibos'
import {Select, Row, Col, Input, Button, Icon} from 'antd'
const Step = Steps.Step;
const SideStep = Steps.SideStep;
const FormItem = FormLayout.FormItem;

export default function Home() {
    return <div>

        <Panel>
            <FormLayout inputSize="large">
                <Row gutter={16}>
                    <Col span={10}>
                        <FormItem label="提单号">
                            <Input placeholder="请输入" />
                        </FormItem>
                    </Col>
                    <Col span={10}>
                        <FormItem label="工作编号">
                            <Input placeholder="请输入"  />
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <FormItem >
                            <Button type="primary">搜 索</Button>
                        </FormItem>
                    </Col>
                </Row>
            </FormLayout>
        </Panel>


        <Panel large>
            <SplitContainer >
                <Row gutter={16}>
                    <Col span={24}><Button type="primary">催一下</Button><Button disabled>预约取单</Button><Button
                        disabled>领取箱单</Button></Col>
                </Row>
                <Split space small/>
                <Row gutter={16}>
                    <Col span={18}><Icon type="info-circle" className="color-primary"/> 已被预约：将于 2017-03-25 12:30 领取副本。<a
                        href="#">修改</a></Col>
                    <Col span={6} className="tar color-gray">2017-03-20 14:40</Col>
                </Row>
            </SplitContainer>

            <Panel noPadding>
                <Steps direction="vertical" hasSide={true}>
                    <Step status="finish" description={
                        <div>
                            我是备注内容
                            <SideStep><h3>已接待</h3>2017-12-12<br/>12:34</SideStep>
                        </div>
                    }/>
                    <Step status="process" description={
                        <div>
                            <div className="mb4">我是备注内容</div>
                            <Button size='small'>催一下</Button>
                            <SideStep><h3>已接待</h3>2017-12-12<br/>12:34</SideStep>
                        </div>
                    }/>
                    <Step description={<SideStep><h3>已接待</h3></SideStep>}/>
                    <Step description={<SideStep><h3>已接待</h3></SideStep>}/>
                </Steps>
            </Panel>
        </Panel>
    </div>

}