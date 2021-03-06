import React from 'react';
// import EllipsisText from 'react-ellipsis-text';
import Truncate from 'react-truncate'
import { Tag } from 'antd';
import Moment from 'react-moment';
import styled from 'styled-components';

import {
  ContextMenu,
  ContextMenuTrigger,
  MenuItem,
  SubMenu
} from 'react-contextmenu';
import {
  NoteCardStyle,
} from './NoteCard.style';
import { RightFloaty } from '../../../style/utils.style';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClock, faListAlt  } from "@fortawesome/free-regular-svg-icons";
import {  faFolderOpen, faInbox, faColumns, faTasks, faFile, faThumbtack, faTh, faStream, faTimesCircle, faExclamationTriangle , faStar} from "@fortawesome/free-solid-svg-icons";

const removeMd = require('remove-markdown');
export const InlineItem = styled.div`
  display: inline;
  margin-right: 3px;
  font-size: smaller;
  > .svg-inline--fa {
    margin-right: 2px;
  }
`
export default function NoteCard(props) {
  const {
    cmPinNoteHandler,
    cmCreateChildNoteHandler,
    cmShowInMenuHandler,
    cmChangeKindHandler,
    cmDeleteNoteHandler,
    cmRestoreNoteHandler,
    cmHardDeleteNoteHandler,
    cmSwitchEditorHandler
  } = props.handlers;
  const { title, content, tags, _id, createdAt, updatedAt,children, kind, pinned, showInMenu,starred, deleted} = props.note;
  return (
    <>
      <ContextMenuTrigger id={`${_id}cm`}>
        <NoteCardStyle
          className="noselect"
          key={`${_id}style`}
          onClick={e => props.handleClick(props.note._id)}
          {...props}
        >
          <div className="noteListTitle">{title || 'Untitled Note'}</div>
          <div className="noteCardMeta">
            {children && children.length > 0 && <InlineItem><FontAwesomeIcon icon={faFolderOpen} title={`Contains ${children.length} subnotes`} />{children.length}</InlineItem>}
            <InlineItem title={new Date(createdAt)}><Moment fromNow>{createdAt}</Moment></InlineItem>

            <RightFloaty>
              {pinned && <InlineItem><FontAwesomeIcon title="This note is pinned" icon={faThumbtack} /></InlineItem>}
              {showInMenu && <InlineItem><FontAwesomeIcon title="Shown in menu" icon={faStream} /></InlineItem>}
              {kind === 'collection' && <InlineItem><FontAwesomeIcon title="Note Type: Collection" icon={faInbox} /></InlineItem>}
              {kind === 'tasks' && <InlineItem><FontAwesomeIcon title="Note Type: tasks" icon={faTasks} /></InlineItem>}
              {kind === 'index' && <InlineItem><FontAwesomeIcon title="Note Type: index" icon={faListAlt} /></InlineItem>}
              {kind === 'columns' && <InlineItem><FontAwesomeIcon title="Note Type: columns" icon={faColumns} /></InlineItem>}
              {starred && <InlineItem><FontAwesomeIcon title="Favourited" icon={faStar} /></InlineItem>}
              {deleted && children.length > 0 && <InlineItem><FontAwesomeIcon title="This note cannot be deleted until all its subnotes have been removed." icon={faExclamationTriangle} /></InlineItem>}

            </RightFloaty>
          </div>
          <div className="noteTags">

          {tags &&
              tags.length > 0 &&<InlineItem >{ tags.map(t => <span key={`tag-${_id}-${t}`} style={{marginLeft: '3px', fontStyle: 'italic'}}>{t}</span>) }</InlineItem>}
          </div>
            <div className="notePreview">
              <Truncate lines={2} ellipsis={<span>...</span>}>
                  {removeMd(content)}
              </Truncate>
            </div>
        </NoteCardStyle>
      </ContextMenuTrigger>

      <ContextMenu id={`${_id}cm`} key={`${_id}cm`}>
        <MenuItem data={{ note: props.note }} onClick={cmPinNoteHandler}>
          {props.note.pinned ? <span>Unpin</span> : <span>Pin to top</span>}
        </MenuItem>
        <MenuItem
          data={{ note: props.note }}
          onClick={cmCreateChildNoteHandler}
        >
          New sub-note
        </MenuItem>
        <MenuItem data={{ note: props.note }} onClick={cmShowInMenuHandler}>
          {props.note.showInMenu ? (
            <span>Remove from menu</span>
          ) : (
            <span>Show in menu</span>
          )}
        </MenuItem>
        <MenuItem data={{ note: props.note, editor: props.note.editor === "richtext" ? "markdown" : "richtext" }} onClick={cmSwitchEditorHandler}>
          {props.note.editor && props.note.editor === "richtext" ? (
            <span>Switch to Markdown editor</span>
            ) : (
              <span>Switch to rich-text editor</span>
          )}
        </MenuItem>
        <SubMenu title="Change type" delay={0}>
          <MenuItem
            data={{ note: props.note, kind: 'collection' }}
            onClick={cmChangeKindHandler}
          >
           <FontAwesomeIcon icon={faFolderOpen} /> Collection
          </MenuItem>
          <MenuItem
            data={{ note: props.note, kind: 'index' }}
            onClick={cmChangeKindHandler}
          >
           <FontAwesomeIcon icon={faListAlt} /> Index
          </MenuItem>
          <MenuItem
            data={{ note: props.note, kind: 'tasks' }}
            onClick={cmChangeKindHandler}
          >
            <FontAwesomeIcon icon={faTasks} /> Tasks
          </MenuItem>
          <MenuItem
            data={{ note: props.note, kind: 'columns' }}
            onClick={cmChangeKindHandler}
          >
            <FontAwesomeIcon icon={faColumns} /> Column
          </MenuItem>
          <MenuItem
            data={{ note: props.note, kind: 'group' }}
            onClick={cmChangeKindHandler}
          >
            <FontAwesomeIcon icon={faTh} /> Group
          </MenuItem>
          <MenuItem
            data={{ note: props.note, kind: 'normal' }}
            onClick={cmChangeKindHandler}
          >
            <FontAwesomeIcon icon={faFile} />  Normal
          </MenuItem>
        </SubMenu>
        <MenuItem
          data={{ note: props.note }}
          onClick={props.note.deleted ? cmRestoreNoteHandler : cmDeleteNoteHandler}
          style={{ backgroundColor: 'red' }}
        >
          {props.note.deleted === true ? "Restore from Trash" : "Delete"}
        </MenuItem>

        { props.note.deleted === true &&    <>
          <MenuItem divider />
         <MenuItem
          data={{ note: props.note }}
          onClick={cmHardDeleteNoteHandler}
          style={{ backgroundColor: 'red' }}
        >
            Delete permanently
        </MenuItem></> }
      </ContextMenu>
    </>
  );
}
