import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import cls from 'classnames';
import { useDispatch } from 'react-redux';

import { MyGallery } from '../../src/components/blocks/MyGallery';
import { Button } from '../../src/components/elements/Button';
import { Page } from '../../src/components/layout/Page';
import { userService } from '../../src/services/user';

import styles from '../../styles/Product.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCheck } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from 'src/models';
import { productService } from 'src/services/product';
import { addToCart } from 'src/redux/slice';

const Product: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<IProduct | null>(null);

  const { id } = router.query;

  const [count, setCount] = useState(1);
  const counterPlus = () => {
    setCount((s) => ++s);
  };

  const counterMinus = () => {
    if (count > 1) {
      setCount((s) => --s);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, count }));
  };

  // hooks
  useEffect(() => {
    if (id) {
      productService
        .getById(id as string)
        .then((x) => setProduct(x))
        .catch(() => router.back());
    }
  }, []);

  if (!product) return null;

  return (
    <div>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Page img={'../assets/shop-detail-banner.jpg'} title="SHOP DETAIL">
        <section className={cls(styles.pt_100)}>
          <Container>
            <Row>
              <Col lg={5} md={6} xs={12}>
                <MyGallery src={[product.img, ...product.gallery]} />
              </Col>
              <Col lg={7} md={6} xs={12}>
                <div className={styles.product_detail_in}>
                  <h2
                    className={cls(
                      styles.product_item_name,
                      styles.text_uppercase
                    )}
                  >
                    {product.name}
                  </h2>
                  <div className={styles.price_box}>
                    <span className={styles.price}>$ {product.price}</span>
                    {/* <del className={cls(styles.price, styles.old_price)}>
                      $120.00
                    </del> */}
                    <div className={styles.rating_summary_block}>
                      <div className={styles.star_rating}>
                        <input
                          id="star-5"
                          type="radio"
                          name="rating"
                          value="star-5"
                        />
                        <label htmlFor="star-5" title="5 stars">
                          <FontAwesomeIcon icon={faStar} />
                        </label>
                        <input
                          id="star-4"
                          type="radio"
                          name="rating"
                          value="star-4"
                        />
                        <label htmlFor="star-4" title="4 stars">
                          <FontAwesomeIcon icon={faStar} />
                        </label>
                        <input
                          id="star-3"
                          type="radio"
                          name="rating"
                          value="star-3"
                        />
                        <label htmlFor="star-3" title="3 stars">
                          <FontAwesomeIcon icon={faStar} />
                        </label>
                        <input
                          id="star-2"
                          type="radio"
                          name="rating"
                          value="star-2"
                        />
                        <label htmlFor="star-2" title="2 stars">
                          <FontAwesomeIcon icon={faStar} />
                        </label>
                        <input
                          id="star-1"
                          type="radio"
                          name="rating"
                          value="star-1"
                        />
                        <label htmlFor="star-1" title="1 star">
                          <FontAwesomeIcon icon={faStar} />
                        </label>
                      </div>
                      <a href="#product-review" className={styles.scrollTo}>
                        <span>1 Review (s)</span>
                      </a>
                    </div>
                    <div className={styles.product_des}>
                      <p>{product.description}</p>
                    </div>
                    <ul>
                      <li>
                        <FontAwesomeIcon icon={faCheck} /> Satisfaction 100%
                        Guaranteed
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faCheck} /> Free shipping on
                        orders over $99
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faCheck} /> 14 day easy Return
                      </li>
                    </ul>
                    <Row className={styles.mt_20}>
                      <Col xs={12}>
                        <div className={cls(styles.table_listing, styles.qty)}>
                          <label>Qty:</label>
                          <div className={styles.quantity_input}>
                            <button
                              className={cls(
                                styles.quantity_input__modifier,
                                styles.quantity_input__modifier__left
                              )}
                              onClick={counterMinus}
                            >
                              &mdash;
                            </button>
                            <input
                              className={styles.quantity_input__screen}
                              type="text"
                              value={count}
                            />
                            <button
                              className={cls(
                                styles.quantity_input__modifier,
                                styles.quantity_input__modifier__right
                              )}
                              onClick={counterPlus}
                            >
                              &#xff0b;
                            </button>
                          </div>
                        </div>
                        {/* <div className={cls(styles.table_listing, styles.qty)}>
                          <label>Size:</label>
                          <div className={styles.fill_input}>
                            <select
                              className={cls(styles.selectpicker, styles.full)}
                            >
                              <option value="#">8</option>
                              <option value="#">7</option>
                              <option value="#">6</option>
                            </select>
                          </div>
                        </div> */}
                        {/* <div className={cls(styles.table_listing, styles.qty)}>
                          <label>Color:</label>
                          <div className={styles.fill_input}>
                            <select
                              className={cls(styles.selectpicker, styles.full)}
                            >
                              <option value="#">Blue</option>
                              <option value="#">Green</option>
                              <option value="#">Orange</option>
                              <option value="#">White</option>
                            </select>
                          </div>
                        </div> */}
                        <div className={styles.product_action}>
                          <ul>
                            <li>
                              <Button
                                text="Add to card"
                                type="color"
                                onClick={handleAddToCart}
                              />
                            </li>
                            <li>
                              <a href="#" className="btn">
                                <i></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Page>
    </div>
  );
};
export default Product;