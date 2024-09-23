'use client'

import React, {useEffect, useState} from 'react';
import DividerLine from "@/components/DividerLine";
import SearchConditions from "@/components/SearchConditions";
import CreateShop from "@/components/CreateShop";
import {Shop} from "@/types/shop";
import {getShops} from "@/actions/shops";
import ShopList from "@/components/ShopList";
import { useSession } from 'next-auth/react';


export default function Shops() {
    const [shops, setShops] = useState<Shop[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchShops = async () => {
            try {
                console.log("Session status:", status);
                console.log("Session data:", session);
                const fetchedShops = await getShops();
                setShops(fetchedShops);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch shops');
                setLoading(false);
            }
        };

        fetchShops();
    }, []);

    return (
        <>
            <SearchConditions/>
            <DividerLine/>
            {loading && <div>Loading shops...</div>}
            {error && <div>Error: {error}</div>}
            {!loading && !error && <ShopList shops={shops} />}
            <CreateShop/>
            <svg width="0" height="0">
                <defs>
                    <linearGradient id="gradientColors" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00c6ff"/>
                        <stop offset="100%" stopColor="#eb0ef2"/>
                    </linearGradient>
                </defs>
            </svg>
        </>
    )
}