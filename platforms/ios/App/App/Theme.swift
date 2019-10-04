//
//  Theme.swift
//  App
//
//  Created by Bruno Fortunato on 20/10/2016.
//  Copyright © 2016 Bruno Fortunato. All rights reserved.
//

import Foundation
import UIKit
import ApplicaFramework

struct Dimensions {
    static let padding = CGFloat(16)
    static let doublePadding = Dimensions.padding * 2
    static let quadPadding = Dimensions.padding * 4
    
    static let navigationBarHeight = CGFloat(48)
    static let statusBarHeight = CGFloat(20)
    static let actionBarHeight = X3(152)
    static let tabBarHeight = CGFloat(49)
    static let statusAndNavigationBarHeight = CGFloat(64)
    
    static let cornerRadius = CGFloat(5)
    static let jumbotronFontSize = CGFloat(48)
    static let bigFontSize = CGFloat(24)
    static let mediumFont = CGFloat(18)
    static let smallFont = CGFloat(14)
    static let buttonWidth = CGFloat(120)
    static let buttonHeight = CGFloat(40)
}

struct Colors {
    static let viewBackground = UIColor.white
    static let primary = RGB(58, 93, 164)
    static let disabled = RGB(100, 100, 100)
    static let text = RGB(20, 20, 20)
    static let textInverse = UIColor.white
    static let viewBackgroundInverse = UIColor.black
    static let separator = RGB(200, 200, 200)
}

enum Style {
    case mainView
    case mainViewInverse
    case buttonPrimary
    case textTitle1
    case textTitle2
    case textTitle3
    case textHeadline
    case textBody
    case textCallout
    case textSubhead
    case textFootnote
    case textCaption1
    case textCaption2
    case textField
    case textTitle1Inverse
    case textTitle2Inverse
    case textTitle3Inverse
    case textHeadlineInverse
    case textBodyInverse
    case textCalloutInverse
    case textSubheadInverse
    case textFootnoteInverse
    case textCaption1Inverse
    case textCaption2Inverse
    case textJumbotron
    case textJumbotronInverse
    
    case loginTextField
    case loginButton
    case welcomeButtonLogin
    case welcomeButtonSignup
    case separator
}

typealias ThemeStyler = (UIView) -> Void

class Theme {
    
    private var _stylers = [Style: ThemeStyler]()
    
    class func apply(style: Style, to view: UIView) {
        _theme.apply(style: style, to: view)
    }
    
    class func load(_ theme: Theme) {
        _theme = theme
    }
    
    func apply(style: Style, to view: UIView) {
        if let styler = _stylers[style] {
            styler(view)
        }
    }
    
    func configure(style: Style, with styler: @escaping ThemeStyler) {
        _stylers[style] = styler
    }
    
}

fileprivate var _theme: Theme! = nil


class ThemeInitializer {
    
    class func configure() {
        let defaultTheme = Theme()
        
        defaultTheme.configure(style: .mainView) { (view) in
            view.backgroundColor = Colors.viewBackground
        }
        
        defaultTheme.configure(style: .mainViewInverse) { (view) in
            view.backgroundColor = Colors.primary
        }
        
        defaultTheme.configure(style: .buttonPrimary) { (view) in
            let button = view as! UIButton
            button.contentEdgeInsets = UIEdgeInsetsMake(Dimensions.padding, Dimensions.quadPadding, Dimensions.padding, Dimensions.quadPadding)
            button.clipsToBounds = true
            button.backgroundColor = Colors.primary
        }
        
        defaultTheme.configure(style: .textTitle1) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.title1)
            label.numberOfLines = 0
            label.textColor = Colors.text
        }
        
        defaultTheme.configure(style: .textTitle2) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.title2)
            label.textColor = Colors.text
        }
        
        defaultTheme.configure(style: .textTitle3) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.title3)
            label.textColor = Colors.text
        }
        
        defaultTheme.configure(style: .textHeadline) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.headline)
            label.textColor = Colors.text
        }
        
        defaultTheme.configure(style: .textBody) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.body)
            label.textColor = Colors.text
        }
        
        defaultTheme.configure(style: .textCallout) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.callout)
            label.textColor = Colors.text
        }
        
        defaultTheme.configure(style: .textSubhead) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.subheadline)
            label.textColor = Colors.text
        }
        
        defaultTheme.configure(style: .textFootnote) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.footnote)
            label.textColor = Colors.text
        }
        
        defaultTheme.configure(style: .textCaption1) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.caption1)
            label.textColor = Colors.text
        }
        
        defaultTheme.configure(style: .textCaption2) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.caption2)
            label.textColor = Colors.text
        }
        
        defaultTheme.configure(style: .textJumbotron) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.title1).withSize(Dimensions.jumbotronFontSize)
            label.numberOfLines = 0
            label.textColor = Colors.text
        }
        
        defaultTheme.configure(style: .textTitle1Inverse) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.title1)
            label.numberOfLines = 0
            label.textColor = Colors.textInverse
        }
        
        defaultTheme.configure(style: .textTitle2Inverse) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.title2)
            label.textColor = Colors.textInverse
        }
        
        defaultTheme.configure(style: .textTitle3Inverse) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.title3)
            label.textColor = Colors.textInverse
        }
        
        defaultTheme.configure(style: .textHeadlineInverse) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.headline)
            label.textColor = Colors.textInverse
        }
        
        defaultTheme.configure(style: .textBodyInverse) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.body)
            label.textColor = Colors.textInverse
        }
        
        defaultTheme.configure(style: .textCalloutInverse) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.callout)
            label.textColor = Colors.textInverse
        }
        
        defaultTheme.configure(style: .textSubheadInverse) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.subheadline)
            label.textColor = Colors.textInverse
        }
        
        defaultTheme.configure(style: .textFootnoteInverse) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.footnote)
            label.textColor = Colors.textInverse
        }
        
        defaultTheme.configure(style: .textCaption1Inverse) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.caption1)
            label.textColor = Colors.textInverse
        }
        
        defaultTheme.configure(style: .textCaption2Inverse) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.caption2)
            label.textColor = Colors.text
        }
        
        defaultTheme.configure(style: .textJumbotronInverse) { (view) in
            let label = view as! UILabel
            label.font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.title1).withSize(Dimensions.jumbotronFontSize)
            label.numberOfLines = 0
            label.textColor = Colors.textInverse
        }
        
        defaultTheme.configure(style: .loginTextField) { (view) in
            let textField = view as! UITextField
            textField.layer.borderWidth = 0
        }
        
        defaultTheme.configure(style: .separator) { (view) in
            view.backgroundColor = Colors.separator
        }
        
        defaultTheme.configure(style: .loginButton) { (view) in
            view.frame = CGRect(x: view.frame.origin.x, y: view.frame.origin.y, width: Dimensions.buttonWidth, height: Dimensions.buttonHeight)
            view.backgroundColor = Colors.primary
            view.layer.cornerRadius = Dimensions.cornerRadius
            view.tintColor = Colors.textInverse
        }
        
        defaultTheme.configure(style: .welcomeButtonLogin) { (view) in
            view.frame = CGRect(x: view.frame.origin.x, y: view.frame.origin.y, width: view.frame.width, height: Dimensions.buttonHeight)
            view.tintColor = Colors.textInverse
        }
        
        defaultTheme.configure(style: .welcomeButtonSignup) { (view) in
            view.frame = CGRect(x: view.frame.origin.x, y: view.frame.origin.y, width: view.frame.width, height: Dimensions.buttonHeight)
            view.backgroundColor = Colors.viewBackground
            view.layer.cornerRadius = Dimensions.cornerRadius
            view.tintColor = Colors.primary
        }
        
        Theme.load(defaultTheme)
    }
    
}


