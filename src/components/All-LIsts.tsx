"use client"
type elements = {
    account_id : number,
    movies : object,
    res :object
  }
import { useState, useEffect } from "react"
import Lists from "./Lists"

const AllLists = () => {
   
    return(
        <div className="w-full flex justify-center pb-10">
            <div className="w-[1280px] w-max-[1280px] flex flex-col gap-14">
                <Lists title="upcoming"/>
                <Lists title="popular" />
                <Lists title="Top Rated" />
            </div>
        </div>
    )

}
export default AllLists