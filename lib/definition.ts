export interface FoodPrice {
  header: Header
  result: Result
}

export interface Header {
  success: boolean
  err_code: string
  err_msg: string
}

export interface Result {
  datasize: number
  records: FoodPriceRecord[]
}

export interface FoodPriceRecord {
  Fd_yr: string
  Fd_bread_a: number
  Fd_tobac_a?: number
  Fd_coffee_a: number
  Fd_milk_a: number
  Fd_beef_a: number
  Fd_pork_a: number
  Fd_rice_a: number
  Fd_tea_a: number
  Fd_sugar_a: number
  Fd_salt_a: number
  Fd_beer_a?: number
}
