import FoodPriceTable from '@/features/foodPrice/component/FoodPriceTable'
import React from 'react'

const page = () => {
    return (
        <div className='flex flex-col gap-6'>
            <h1 data-testid="page:dashboard" className='font-bold text-2xl'>Dashboard</h1>
            <FoodPriceTable/>
        </div>
    )
}

export default page