/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*************************************************!*\
  !*** ./src/ui/rubricOrganize/rubricOrganize.ts ***!
  \*************************************************/

/*
 * Portions copyright (c) 2015, James Jones <james@richland.edu>
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
// ==UserScript==
// @include     https://*.instructure.com/courses/*/rubrics/*
// ==/UserScript==
(() => {
    'use strict';
    const pageRegex = new RegExp('^/courses/[0-9]+/rubrics/[0-9]+');
    if (!pageRegex.test(window.location.pathname)) {
        return;
    }
    // Start the edit mode detection.
    waitForEdit();
    // Use MutationObserver to detect when edit mode is entered.
    function waitForEdit(mutations, observer) {
        const parent = document.getElementById('rubrics');
        if (!parent) {
            return;
        }
        const el = parent.querySelector('.rubric_container.rubric.editing');
        if (!el) {
            if (observer === undefined) {
                const obs = new MutationObserver(waitForEdit);
                obs.observe(parent, { childList: true });
            }
            return;
        }
        else {
            if (observer !== undefined) {
                observer.disconnect();
            }
            attachRowSorter();
        }
    }
    // Build the sorting row UI and bind drag-and-drop behavior.
    function attachRowSorter() {
        const tbody = document.querySelector('.rubric_container.rubric.editing .rubric_table tbody');
        if (!tbody) {
            return;
        }
        // Insert the "Sort" header if missing.
        const thead = document.querySelector('.rubric_container.rubric.editing .rubric_table thead');
        if (thead) {
            const headerRow = thead.querySelector('tr');
            if (headerRow && !headerRow.querySelector('.rubric-sort-header')) {
                const th = document.createElement('th');
                th.className = 'rubric-sort-header';
                th.textContent = 'Sort';
                headerRow.insertBefore(th, headerRow.firstChild);
            }
        }
        let draggingRow = null;
        Array.from(tbody.rows).forEach((row) => {
            if (!row.querySelector('.rubric-move-btns')) {
                const btnCell = document.createElement('td');
                btnCell.className = 'rubric-move-btns';
                btnCell.style.whiteSpace = 'nowrap';
                const upBtn = document.createElement('button');
                upBtn.textContent = '↑';
                upBtn.title = 'Move up';
                upBtn.style.marginRight = '4px';
                upBtn.onclick = function (e) {
                    e.stopPropagation();
                    const prev = row.previousElementSibling;
                    if (prev) {
                        tbody.insertBefore(row, prev);
                    }
                };
                const downBtn = document.createElement('button');
                downBtn.textContent = '↓';
                downBtn.title = 'Move down';
                downBtn.onclick = function (e) {
                    e.stopPropagation();
                    const next = row.nextElementSibling;
                    if (next) {
                        tbody.insertBefore(next, row);
                    }
                };
                btnCell.appendChild(upBtn);
                btnCell.appendChild(downBtn);
                row.insertBefore(btnCell, row.firstChild);
            }
            // Setup drag-and-drop functionality.
            row.draggable = true;
            row.addEventListener('dragstart', function (e) {
                draggingRow = row;
                row.style.opacity = '0.5';
            });
            row.addEventListener('dragend', function (e) {
                draggingRow = null;
                row.style.opacity = '';
            });
            row.addEventListener('dragover', function (e) {
                e.preventDefault();
                const bounding = row.getBoundingClientRect();
                const offset = e.clientY - bounding.top;
                if (offset > bounding.height / 2) {
                    row.style.borderBottom = '2px solid #0074D9';
                    row.style.borderTop = '';
                }
                else {
                    row.style.borderTop = '2px solid #0074D9';
                    row.style.borderBottom = '';
                }
            });
            row.addEventListener('dragleave', function (e) {
                row.style.borderBottom = '';
                row.style.borderTop = '';
            });
            row.addEventListener('drop', function (e) {
                e.preventDefault();
                row.style.borderBottom = '';
                row.style.borderTop = '';
                if (draggingRow && draggingRow !== row) {
                    const bounding = row.getBoundingClientRect();
                    const offset = e.clientY - bounding.top;
                    if (offset > bounding.height / 2) {
                        row.after(draggingRow);
                    }
                    else {
                        row.before(draggingRow);
                    }
                }
            });
        });
    }
    // Use event delegation on the stable parent (#rubrics) for the update and cancel buttons.
    const rubricsContainer = document.getElementById('rubrics');
    if (rubricsContainer) {
        rubricsContainer.addEventListener('click', function (e) {
            let target = e.target;
            while (target && target !== this) {
                if (target.matches('.save_button')) {
                    e.stopPropagation();
                    handleUpdateClick();
                    break;
                }
                if (target.matches('.cancel_button')) {
                    e.stopPropagation();
                    handleCancelClick();
                    break;
                }
                target = target.parentElement;
            }
        });
    }
    // The update handler cleans the sorting UI and then reengages edit detection.
    function handleUpdateClick() {
        const sortBtns = document.querySelectorAll('.rubric_container.rubric.editing .rubric_table .rubric-move-btns');
        sortBtns.forEach(btnCell => {
            btnCell.remove();
        });
        const sortHeaders = document.querySelectorAll('.rubric_container.rubric.editing .rubric_table thead .rubric-sort-header');
        sortHeaders.forEach(th => {
            th.remove();
        });
        const currTbody = document.querySelector('.rubric_container.rubric.editing .rubric_table tbody');
        if (currTbody) {
            Array.from(currTbody.rows).forEach((row) => {
                row.draggable = false;
            });
        }
        setTimeout(() => {
            waitForEdit();
        }, 1000);
    }
    // The cancel handler simply reengages edit detection.
    function handleCancelClick() {
        setTimeout(() => {
            waitForEdit();
        }, 1000);
    }
    // Observe for the appearance of the criterion save button and attach the event listener when it appears.
    function observeCriterionBtn() {
        console.log("observeCriterionBtn running");
        let attached = false;
        const observer = new MutationObserver(() => {
            if (attached)
                return;
            console.log("MutationObserver running");
            const criterionBtn = document.querySelector('.btn.save_button.btn-primary');
            if (criterionBtn && !criterionBtn.hasAttribute('data-rubric-organize-listener')) {
                console.log("criterionBtn detected");
                criterionBtn.addEventListener('click', () => {
                    console.log("criterionBtn click event heard");
                    handleUpdateClick();
                    attachRowSorter();
                });
                criterionBtn.setAttribute('data-rubric-organize-listener', 'true');
                attached = true;
                observer.disconnect();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
    observeCriterionBtn();
})();

/******/ })()
;
//# sourceMappingURL=rubricOrganize.js.map