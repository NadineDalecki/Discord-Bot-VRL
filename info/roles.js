const roleList = [
  {name: "Echo Arena", id : "446981661368909824"},
  {name: "The Unspoken", id : "439429317177638922"},
  {name: "Sprint Vector", id : "446981752284643328"},
  {name: "Onward", id : "462242156090753059"},
  {name: "Space Junkies", id : "551080564241989656"},
  {name: "Echo Combat", id : "551080412508848138"},
  {name: "EU", id : "446982022368329728"},
  {name: "NA", id : "446982026046865409"},
  {name: "Staff Member", id: "447791613926834176"},
  {name: "Edition Staff Head", id: "439429011286786048"},
  {name: "Global Staff Head", id: "439428833125335041"},
  {name: "Community Manager", id: "439428040896937985"},
  {name: "Onward Team Captains", id: "561942477674774549"},
  {name: "SJ Team Captains", id: "562951603058114580"},
  {name: "EA Team Captains", id: "561937753613533184"},
  {name: "EC Team Captains", id: "562951552550174733"},
  
  {name: "ea", id : "446981661368909824"},
  {name: "ow", id : "462242156090753059"},
  {name: "sj", id : "551080564241989656"},
  {name: "ec", id : "551080412508848138"},
  {name: "eu", id : "446982022368329728"},
  {name: "na", id : "446982026046865409"},
  {name: "sm", id: "447791613926834176"},
  {name: "esh", id: "439429011286786048"},
  {name: "gsh", id: "439428833125335041"},
  {name: "cm", id: "439428040896937985"},
  {name: "owc", id: "561942477674774549"},
  {name: "sjc", id: "562951603058114580"},
  {name: "eac", id: "561937753613533184"},
  {name: "ecc", id: "562951552550174733"},
  {name: "vcc", id: "561336724345847846"},
  {name: "pw", id: "679365090226601994"}, //pistol whip
  
];
module.exports = {
  get(roleName){
    for(var role of roleList) {
      if(role.name == roleName)
      {
        return role.id;
      }
    };
    return -1;
  }
}
