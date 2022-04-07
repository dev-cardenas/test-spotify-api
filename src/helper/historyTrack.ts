import { ITracks } from "../types/types"

export function saveHistory(lists: ITracks[]){
  localStorage.setItem('history', JSON.stringify(lists))
}

export function getHistory(){
  return JSON.parse(localStorage.getItem('history') || "[]")
}