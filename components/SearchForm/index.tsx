'use client'

import React, { useState, useEffect } from 'react'
import styles from "./style.module.scss";
import {Button, Input, Link} from "@nextui-org/react";
import gardenLogo from "../../../public/images/garden_logo_orkney_font_fixed.png";
import Image from "next/image";
import {MapPinIcon, SearchIcon} from "lucide-react";
import {useRouter} from "next/navigation";

const SearchForm = () => {
    const [activeButton, setActiveButton] = useState('keyword');

    const router = useRouter();
    const handleNavigation = () => {
        router.push('/shops');
    };

    return (
        <div className={styles.layout}>
            <div className={styles.message}>
                <p>「行きつけのBar」が見つかる</p>
            </div>
            <div className={styles.logo}>
                <Image src={gardenLogo} alt="Garden Logo" />
            </div>
            <div className={styles.condition}>
                <Button
                    radius="none"
                    className={`${styles.button} ${activeButton === 'condition' ? styles.active : ''}`}
                    onClick={() => setActiveButton('condition')}
                  >
                    条件で探す
                  </Button>
                  <Button
                    radius="none"
                    className={`${styles.button} ${activeButton === 'keyword' ? styles.active : ''}`}
                    onClick={() => setActiveButton('keyword')}
                  >
                    キーワードで探す
                  </Button>
                  <Button
                    radius="none"
                    className={`${styles.button} ${activeButton === 'area' ? styles.active : ''}`}
                    onClick={() => setActiveButton('area')}
                  >
                    エリアで探す
                  </Button>
            </div>
            <div className={styles.input}>
                <Input
                    placeholder="店名、条件、エリアなど"
                    className={styles.inputText}
                    isClearable
                    classNames={{
                      base: styles.inputBase,
                      mainWrapper: styles.inputMainWrapper,
                      input: styles.inputInner,
                      inputWrapper: styles.inputWrapper
                    }}
                  />
                <Button
                    isIconOnly
                    aria-label="Search"
                    className={styles.inputButton}
                    radius="none"
                    onClick={handleNavigation}
                >
                    <SearchIcon/>
                </Button>
            </div>
            <div className={styles.outerLocation}>
                <Button
                  color="primary"
                  startContent={<MapPinIcon />}
                  className={styles.innerLocation}
                  radius="sm"
                  onClick={handleNavigation}
                >
                  現在地から探す
                </Button>
            </div>
        </div>
    )
}

export default SearchForm