import React, { useState, useContext } from 'react';
import Can from '../../../services/casl';
import { updateRole } from '../../../utils/caslAbility';
import CaslContext from '../../../utils/caslContext';

const Permissions = () => {
  const ability = useContext(CaslContext);
  const [isAdmin, setAdmin] = useState(true);

  const userRole = {
    is_user: true,
    is_admin: false
  };

  const adminRole = {
    is_user: false,
    is_admin: true
  };

  const roleHandler = () => {
    if (isAdmin) {
      setAdmin(false);
      updateRole(ability, userRole);
    } else {
      setAdmin(true);
      updateRole(ability, adminRole);
    }
  };

  return (
    <div>
      <h2>Your Current Role is:</h2>
      {isAdmin ? <p>Admin</p> : <p>User</p>}
      <button onClick={roleHandler}> Change </button>
      <Can I="read" a="admin post">
        <p>Only Admin can see Text</p>
      </Can>
      <Can I="read" a="post">
        <p>User and Admin can see Text</p>
      </Can>
      <p>Render Button but make it disabled for non-admins</p>
      <Can I="create" a="Post" passThrough>
        {(allowed) => <button disabled={!allowed}>Save</button>}
      </Can>
      <p>The optional third prop "field" allows for more fine grained control</p>
      <Can I="read" a="article" field="title">
        <div>Title</div>
      </Can>
      <Can I="read" a="article" field="description">
        <div>Description</div>
      </Can>
      <Can I="read" a="article" field="total views">
        <div>User can't see this field</div>
        <div>3,212</div>
      </Can>
    </div>
  );
};

export default Permissions;
