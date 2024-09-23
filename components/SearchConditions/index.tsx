'use client'

import React, { useState, useEffect } from 'react'
import styles from "./style.module.scss";
import {Button, Input} from "@nextui-org/react";
import {CirclePlus} from "lucide-react";

const SearchConditions = () => {


    return (
        <div className={styles.layout}>
            <div className={styles.conditionArea}>
                <div className={styles.condition}>
                    <p className={styles.title}>条件</p>
                    <p className={styles.explanation}>追加する</p>
                    <Button isIconOnly className={styles.button} size="sm">
                        <CirclePlus className={styles.circlePlus}/>
                    </Button>
                </div>
                <div className={styles.area}>
                    <p className={styles.title}>エリア</p>
                    <p className={styles.explanation}>変更する</p>
                    <Button isIconOnly className={styles.button} size="sm">
                        <CirclePlus className={styles.circlePlus}/>
                    </Button>
                </div>
            </div>
            <div className={styles.keyword}>
                <div className={styles.keywordArea}>
                    <p className={styles.keywordTitle}>キーワード</p>
                    <Input
                        className={styles.keywordContent}
                        classNames={{
                          input: styles.transparentInput,
                          inputWrapper: styles.transparentInputWrapper
                        }}
                    >

                    </Input>
                </div>
            </div>
            <div className={styles.searchButtonArea}>
                <Button className={styles.searchButton}>
                    SEARCH
                </Button>
            </div>
            <div>

            </div>
            <div>

            </div>

        </div>
    )
}

export default SearchConditions