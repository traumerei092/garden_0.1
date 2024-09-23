import React from 'react';
import { Card, CardBody, CardFooter, Image, Chip } from "@nextui-org/react";
import { Shop } from '../../types/shop';
import styles from './style.module.scss';
import {CardHeader} from "@nextui-org/card";

interface ShopCardProps {
  shop: Shop;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
    return (
        <Card className={styles.shopCard}>
            <CardHeader className={styles.cardHeader}>
                <h1>{shop.name}</h1>
            </CardHeader>
            <CardBody className={styles.cardBody}>
                <Image
                    removeWrapper
                    src={shop.icon_image || '/default-shop-icon.png'}
                    alt={shop.name}
                    className={styles.shopImage}
                />
                <div className={styles.overlay}>
                    <h2 className={styles.shopName}>{shop.name}</h2>
                    <div className={styles.shopDetails}>
                        <Chip color="primary" variant="flat" className={styles.chip}>
                            {shop.types[0]?.name || 'タイプなし'}
                        </Chip>
                        <Chip color="secondary" variant="flat" className={styles.chip}>
                            {shop.layouts[0]?.name || 'レイアウトなし'}
                        </Chip>
                    </div>
                </div>
            </CardBody>
            <CardFooter className={styles.cardFooter}>
                <div className={styles.distance}>
                    <p>現在地から300m</p>
                    <p>福岡県 > 福岡市 > 大名</p>
                </div>
                <div>
                    {shop.concepts.map((concept) => (
                        <Chip key={concept.id} color="default" variant="flat" className={styles.conceptChip}>
                            {concept.name}
                        </Chip>
                    ))}
                </div>
            </CardFooter>
        </Card>
    );
};

export default ShopCard;