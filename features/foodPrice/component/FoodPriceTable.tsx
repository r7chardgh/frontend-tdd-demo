import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { promises as fs } from 'fs';
import { FoodPrice, FoodPriceRecord } from '@/lib/definition';
const FoodPriceTable = async () => {
  const file = await fs.readFile(process.cwd() + '/public/dummy.json', 'utf8');
  const data:FoodPrice = JSON.parse(file);


    const heads = [
        "year","bread","tobacco","coffee","milk","beef","pork","rice","tea","sugar","salt","beer"
    ];

    
   return data.header?.err_code==='0000'&&  data.header?.success ?(
    <TableContainer component={Paper} sx={{maxHeight:420}} className='min-w-[660px]'>
      <Table stickyHeader  aria-label="simple table" >
        <TableHead>
          <TableRow>
            {heads.map((title,i)=><TableCell align={`${i===0?"left":"right"}`} key={i}>{title}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
            {data.result.records.map((record:FoodPriceRecord,i:number)=>{
                return  ( <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell     component="th" scope="row">
                {record.Fd_yr}
              </TableCell>
              <TableCell align="right">{record.Fd_bread_a}</TableCell>
              <TableCell align="right">{record.Fd_tobac_a}</TableCell>
              <TableCell align="right">{record.Fd_coffee_a}</TableCell>
              <TableCell align="right">{record.Fd_milk_a}</TableCell>
              <TableCell align="right">{record.Fd_beef_a}</TableCell>
              <TableCell align="right">{record.Fd_pork_a}</TableCell>
              <TableCell align="right">{record.Fd_rice_a}</TableCell>
              <TableCell align="right">{record.Fd_tea_a}</TableCell>
              <TableCell align="right">{record.Fd_sugar_a}</TableCell>
              <TableCell align="right">{record.Fd_salt_a}</TableCell>
              <TableCell align="right">{record.Fd_beer_a}</TableCell>
            </TableRow>);
            })}
          {/* {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  ):(<div>No data is found</div>);
}

export default FoodPriceTable