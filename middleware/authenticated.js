
import { isAuthenticated } from "../utils/";
export default function ({ store, redirect }) {
  // If the user is authenticated
  if (isAuthenticated(store)) {    
    return redirect('/')
  }
}