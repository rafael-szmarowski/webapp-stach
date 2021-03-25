import React, { useState, useEffect } from "react";

import Header from "./Header";
import { connect } from "react-redux";

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";

import { useHistory } from "react-router-dom";

const FavoriteScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [favoriteTab, setFavoriteTab] = useState({});
  let history = useHistory();

  useEffect(() => {
    async function getResponse() {
      setLoading(true);
      let shopsFetch = await fetch(`/favorites`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      let body = await shopsFetch.json();
      setFavoriteTab(body.favoriteShops);
      setLoading(false);
    }
    getResponse();
    return () => {};
  }, [props.token]);

  function navigation(shopDetails) {
    props.saveChosenOffer(shopDetails);
    history.push("/ShopScreen");
  }

  return (
    <div className="containerHomeScreen">
      <Header />
      <Container>
        <Row>
          <Col
            xs={{ size: 12 }}
            md={{ size: 6, offset: 3 }}
            className="mt-4 mb-4"
          >
            <h2 style={{ marginBottom: 26 }}>Vos Favoris</h2>
            {loading ? <Spinner color="primary" /> : null}
            {favoriteTab.length > 0
              ? favoriteTab.map((element, i) => {
                  return (
                    <Card
                      className="mb-2 p-4"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <CardImg
                        top
                        width="20%"
                        src={element.shopImages[0]}
                        alt="Card image cap"
                        style={{ width: "50%", objectFit: "cover" }}
                      />
                      <CardBody>
                        <CardTitle tag="h5">{element.shopName}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                          {element.shopAddress}
                        </CardSubtitle>
                        <Button
                          onClick={() => navigation(element)}
                          style={{ backgroundColor: "#4280AB" }}
                        >
                          Voir le détail
                        </Button>
                      </CardBody>
                    </Card>
                  );
                })
              : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    favorite: state.favorite,
    token: state.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveChosenOffer: function (shopDetails) {
      dispatch({
        type: "selectOffer",
        shopDetails: shopDetails,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteScreen);
