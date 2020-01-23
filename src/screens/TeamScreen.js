import React from "react";
import AppLayout from "../components/layouts/AppLayout";
import Divider from "antd/lib/divider";
import Card from "antd/lib/card";
import ConstantinBurger from "../static/img/team/constantin.jpg";
import MohamedBelabes from "../static/img/team/mohamed.jpg";
import AlexZerah from "../static/img/team/alex.jpg";
import TimPardieu from "../static/img/team/tim.jpg";
import KevinHuang from "../static/img/team/kevinhuang78.jpg";
import PierreGrimaud from "../static/img/team/pgrimaud.jpg";

const TeamScreen = () => (
    <AppLayout
        defaultOpenKeys={['about']}
        defaultSelectedKeys={['team']}
    >
        <Divider>Team Front-End (React)</Divider>
        <div className="team">
        <div className="team__item">
            <a href="https://github.com/kevinhuang78" rel="noreferrer noopener" target="_blank">
                <Card
                    hoverable
                    cover={<img alt="Kévin Huang" src={KevinHuang} />}
                >
                    <Card.Meta title="Kévin Huang" description="https://github.com/kevinhuang78" />
                </Card>
            </a>
        </div>
        <div className="team__item">
            <a href="https://github.com/timprd" rel="noreferrer noopener" target="_blank">
                <Card
                    hoverable
                    cover={<img alt="Tim Pardieu" src={TimPardieu} />}
                >
                    <Card.Meta title="Tim Pardieu" description="https://github.com/timprd" />
                </Card>
            </a>
        </div>
        <div className="team__item">
            <a href="https://github.com/angulartist" rel="noreferrer noopener" target="_blank">
                <Card
                    hoverable
                    cover={<img alt="Mohamed Bélabès" src={MohamedBelabes} />}
                >
                    <Card.Meta title="Mohamed Bélabès" description="https://github.com/angulartist" />
                </Card>
            </a>
        </div>
        <div className="team__item">
            <a href="https://github.com/alexzerah" rel="noreferrer noopener" target="_blank">
                <Card
                    hoverable
                    cover={<img alt="Alex Zérah" src={AlexZerah} />}
                >
                    <Card.Meta title="Alex Zérah" description="https://github.com/alexzerah" />
                </Card>
            </a>
        </div>
        <div className="team__item">
            <a href="https://github.com/Cbrgr" rel="noreferrer noopener" target="_blank">
                <Card
                    hoverable
                    cover={<img alt="Constantin Bürger" src={ConstantinBurger} />}
                >
                    <Card.Meta title="Constantin Bürger" description="https://github.com/Cbrgr" />
                </Card>
            </a>
        </div>
        </div>
        
        <Divider>Team Back-End (API)</Divider>
        <div className="team__item">
            <a href="https://github.com/pgrimaud" rel="noreferrer noopener" target="_blank">
                <Card
                    hoverable
                    cover={<img alt="Pierre Grimaud" src={PierreGrimaud} />}
                >
                    <Card.Meta title="Pierre Grimaud" description="https://github.com/pgrimaud" />
                </Card>
            </a>
        </div>
    </AppLayout>
);

export default TeamScreen;