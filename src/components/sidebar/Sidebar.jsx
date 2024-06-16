import "./sidebar.css";
import {Users} from "../../Dummydata";

import { RssFeed,SpeakerNotes,PlayCircle,Bookmark,HelpOutline,WorkOutline,Event,School } from "@mui/icons-material";
import CloseFriend from "../closeFriend/CloseFriend";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
      <ul className="sidebarList">
        <li className="sidebarListItem">
         <RssFeed className="sidebarIcon"/>
         <span className="sidebarListItemText">Feed</span>
        </li>
        <li className="sidebarListItem">
         <SpeakerNotes className="sidebarIcon"/>
         <span className="sidebarListItemText">Chats</span>
        </li>
        <li className="sidebarListItem">
         <PlayCircle className="sidebarIcon"/>
         <span className="sidebarListItemText">Videos</span>
        </li>
        <li className="sidebarListItem">
         <Bookmark className="sidebarIcon"/>
         <span className="sidebarListItemText">Bookmark</span>
        </li>
        <li className="sidebarListItem">
         <HelpOutline className="sidebarIcon"/>
         <span className="sidebarListItemText">Questions</span>
        </li>
        <li className="sidebarListItem">
         <WorkOutline className="sidebarIcon"/>
         <span className="sidebarListItemText">Jobs</span>
        </li>
        <li className="sidebarListItem">
         <Event className="sidebarIcon"/>
         <span className="sidebarListItemText">Events</span>
        </li>
        <li className="sidebarListItem">
         <School className="sidebarIcon"/>
         <span className="sidebarListItemText">Courses</span>
        </li>
      </ul>
      <button className="sidebarButton">Show More</button>
      <hr className="sidebarHr"></hr>
     <ul className="sidebarFriendList">
      {Users.map((u)=>(
        <CloseFriend key={u.id} user={u}/>
      ))}
      
     </ul>
      </div>
      
      </div>
  )
}
