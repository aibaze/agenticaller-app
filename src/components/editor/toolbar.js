import PropTypes from 'prop-types';

import { StyledEditorToolbar } from './styles';

// ----------------------------------------------------------------------

const HEADINGS = ['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6'];

export const formats = [
  'align',
  'background',
  'blockquote',
  'bold',
  'bullet',
  'font',
  'header',
  'indent',
  'italic',
  'list',
  'size',
  'underline',
];

export default function Toolbar({ id, simple, simpleDisable, ...other }) {
  // If both simple and simpleDisable are true, do not render the toolbar
  if (simple && simpleDisable) {
    return null;
  }

  return (
    <StyledEditorToolbar {...other}>
      <div id={id}>
        <div className="ql-formats">
          <select className="ql-header" defaultValue="">
            {HEADINGS.map((heading, index) => (
              <option key={heading} value={index + 1}>
                {heading}
              </option>
            ))}
            <option value="">Normal</option>
          </select>
        </div>

        {!simpleDisable && (
          <div className="ql-formats">
            <button type="button" className="ql-bold" />
            <button type="button" className="ql-italic" />
            <button type="button" className="ql-underline" />
            {/*  <button type="button" className="ql-strike" /> */}
          </div>
        )}

        {!simple && (
          <div className="ql-formats">
            <select className="ql-color" />
            <select className="ql-background" />
          </div>
        )}

        {!simpleDisable && (
          <div className="ql-formats">
            <button type="button" className="ql-list" value="ordered" />
            <button type="button" className="ql-list" value="bullet" />
            {/*  {!simple && <button type="button" className="ql-indent" value="-1" />}
            {!simple && <button type="button" className="ql-indent" value="+1" />} */}
          </div>
        )}
        {!simple && (
          <div className="ql-formats">
            <button type="button" className="ql-script" value="super" />
            <button type="button" className="ql-script" value="sub" />
          </div>
        )}

        {/*    {!simple && (
          <div className="ql-formats">
            <button type="button" className="ql-code-block" />
            <button type="button" className="ql-blockquote" />
          </div>
        )} */}
        {/*   {!simpleDisable && (
          <div className="ql-formats">
            <button type="button" className="ql-direction" value="rtl" />
            <select className="ql-align" />
          </div>
        )} */}
        {!simpleDisable && (
          <div className="ql-formats">
            <button type="button" className="ql-link" />
            {/*  <button type="button" className="ql-image" />
            <button type="button" className="ql-video" /> */}
          </div>
        )}
        {/*  {!simpleDisable && (
          <div className="ql-formats">
            {!simple && <button type="button" className="ql-formula" />}
            <button type="button" className="ql-clean" />
          </div>
        )} */}
      </div>
    </StyledEditorToolbar>
  );
}

Toolbar.propTypes = {
  id: PropTypes.string,
  simple: PropTypes.bool,
};
