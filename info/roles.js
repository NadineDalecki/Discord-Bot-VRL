const roleList = [
  
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
  {name: "pw", id: "679365090226601994"}, 
  
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
